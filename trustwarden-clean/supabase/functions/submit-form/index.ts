import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js/cors";
import { z } from "npm:zod@3.25.76";

const RATE_LIMIT_WINDOW_MINUTES = 15;
const MAX_SUBMISSIONS_PER_WINDOW = 5;

const commonSchema = z.object({
  form_type: z.enum(["contact", "lead"]),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(100).optional().nullable(),
  website: z.string().trim().max(0).optional(),
});

const contactSchema = commonSchema.extend({
  form_type: z.literal("contact"),
  message: z.string().trim().min(1).max(2000),
});

const leadSchema = commonSchema.extend({
  form_type: z.literal("lead"),
  message: z.string().optional().nullable(),
});

const submissionSchema = z.discriminatedUnion("form_type", [contactSchema, leadSchema]);

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const getClientIp = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  req.headers.get("cf-connecting-ip") ||
  req.headers.get("x-real-ip") ||
  "unknown";

async function sendNotificationEmail(data: {
  form_type: "contact" | "lead";
  name: string;
  email: string;
  company?: string | null;
  message?: string | null;
}) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL");

  if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
    console.warn("RESEND_API_KEY or NOTIFY_EMAIL not set — skipping notification");
    return;
  }

  const isLead = data.form_type === "lead";
  const subject = isLead
    ? `📥 New report download — ${data.name}${data.company ? ` (${data.company})` : ""}`
    : `📬 New contact form — ${data.name}${data.company ? ` (${data.company})` : ""}`;

  const html = isLead
    ? `<div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a2e;">
        <div style="background:#6b5ce7;padding:20px 24px;border-radius:8px 8px 0 0;">
          <h2 style="color:#fff;margin:0;font-size:18px;">📥 Report Downloaded</h2>
          <p style="color:#c4bbff;margin:4px 0 0;font-size:13px;">Someone downloaded the Security Audit Starter Report</p>
        </div>
        <div style="background:#f8f7ff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e0ddf7;">
          <table style="width:100%;font-size:14px;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#666;width:100px;">Name</td><td style="padding:8px 0;font-weight:600;">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#6b5ce7;">${data.email}</a></td></tr>
            ${data.company ? `<tr><td style="padding:8px 0;color:#666;">Company</td><td style="padding:8px 0;">${data.company}</td></tr>` : ""}
          </table>
          <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e0ddf7;">
            <a href="mailto:${data.email}?subject=Following up on your TrustWarden security report"
               style="background:#6b5ce7;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;">
              Follow Up with ${data.name.split(" ")[0]} →
            </a>
          </div>
        </div>
      </div>`
    : `<div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a2e;">
        <div style="background:#6b5ce7;padding:20px 24px;border-radius:8px 8px 0 0;">
          <h2 style="color:#fff;margin:0;font-size:18px;">📬 New Contact Form Submission</h2>
          <p style="color:#c4bbff;margin:4px 0 0;font-size:13px;">Someone reached out via the contact form</p>
        </div>
        <div style="background:#f8f7ff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e0ddf7;">
          <table style="width:100%;font-size:14px;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#666;width:100px;">Name</td><td style="padding:8px 0;font-weight:600;">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#6b5ce7;">${data.email}</a></td></tr>
            ${data.company ? `<tr><td style="padding:8px 0;color:#666;">Company</td><td style="padding:8px 0;">${data.company}</td></tr>` : ""}
          </table>
          <div style="background:#fff;border:1px solid #e0ddf7;border-radius:6px;padding:14px;margin-top:16px;">
            <p style="color:#666;font-size:12px;margin:0 0 6px;">Message</p>
            <p style="font-size:14px;margin:0;line-height:1.6;">${data.message}</p>
          </div>
          <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e0ddf7;">
            <a href="mailto:${data.email}?subject=Re: Your TrustWarden enquiry"
               style="background:#6b5ce7;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;">
              Reply to ${data.name.split(" ")[0]} →
            </a>
          </div>
        </div>
      </div>`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "TrustWarden Notifications <onboarding@resend.dev>",
      to: [NOTIFY_EMAIL],
      subject,
      html,
    }),
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json().catch(() => null);
    if (!rawBody || typeof rawBody !== "object") {
      return jsonResponse({ error: "Invalid submission." }, 400);
    }

    if (typeof rawBody.website === "string" && rawBody.website.trim().length > 0) {
      return jsonResponse({ success: true });
    }

    const parsed = submissionSchema.safeParse(rawBody);
    if (!parsed.success) {
      return jsonResponse({ error: "Invalid submission." }, 400);
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const ipAddress = getClientIp(req);
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();

    const { count, error: rateLimitError } = await supabaseAdmin
      .from("submission_rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("ip_address", ipAddress)
      .eq("form_type", parsed.data.form_type)
      .gte("submitted_at", windowStart);

    if (rateLimitError) {
      console.error("Rate limit lookup failed", rateLimitError);
      return jsonResponse({ error: "Something went wrong. Please try again." }, 500);
    }

    if ((count ?? 0) >= MAX_SUBMISSIONS_PER_WINDOW) {
      return jsonResponse({ error: "Too many submissions. Please try again later." }, 429);
    }

    const submission = {
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company?.trim() || null,
      ...(parsed.data.form_type === "contact" ? { message: parsed.data.message } : {}),
    };

    const tableName = parsed.data.form_type === "contact" ? "contact_submissions" : "lead_submissions";

    // Run rate limit insert and submission insert in parallel
    const [rateLimitInsert, submissionInsert] = await Promise.all([
      supabaseAdmin.from("submission_rate_limits").insert({
        ip_address: ipAddress,
        form_type: parsed.data.form_type,
      }),
      supabaseAdmin.from(tableName).insert(submission),
    ]);

    if (rateLimitInsert.error) {
      console.error("Rate limit insert failed", rateLimitInsert.error);
      return jsonResponse({ error: "Something went wrong. Please try again." }, 500);
    }

    if (submissionInsert.error) {
      console.error("Submission insert failed", submissionInsert.error);
      return jsonResponse({ error: "Something went wrong. Please try again." }, 500);
    }

    // Fire notification email — non-blocking so it never fails the request
    sendNotificationEmail({
      form_type: parsed.data.form_type,
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      message: parsed.data.form_type === "contact" ? parsed.data.message : null,
    }).catch((err) => console.error("Notification email failed:", err));

    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Unexpected submit-form error", error);
    return jsonResponse({ error: "Something went wrong. Please try again." }, 500);
  }
});
