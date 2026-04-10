import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileDown, ShieldCheck, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { isValidEmail, getErrorMessage } from "@/lib/utils";

const LeadMagnet = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", company: "", website: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Required field validation
    if (!form.name.trim() || !form.email.trim()) {
      toast({ title: "Please fill in your name and email.", variant: "destructive" });
      return;
    }

    // Email format validation
    if (!isValidEmail(form.email)) {
      toast({ title: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    // Offline detection
    if (!navigator.onLine) {
      toast({ title: "You appear to be offline.", description: "Please check your connection and try again.", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("submit-form", {
        body: {
          form_type: "lead",
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim() || null,
          website: form.website,
        },
      });

      if (error || data?.error) {
        toast({ title: getErrorMessage(data?.error || error?.message), variant: "destructive" });
        setLoading(false);
        return;
      }
    } catch {
      if (!navigator.onLine) {
        toast({ title: "You appear to be offline.", description: "Please check your connection and try again.", variant: "destructive" });
      } else {
        toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
      }
      setLoading(false);
      return;
    }

    setLoading(false);
    toast({ title: "Your report is downloading!", description: "The Security Audit Starter Report has been saved to your device." });
    setForm({ name: "", email: "", company: "", website: "" });

    // Trigger PDF download
    const a = document.createElement("a");
    a.href = "/security-audit-starter-report.pdf";
    a.download = "TrustWarden-Security-Audit-Starter-Report.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 grid-cyber opacity-15" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="glass rounded-2xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-8 w-8 text-accent flex-shrink-0" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Get a Free Security Audit Starter Report</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Download our comprehensive security checklist and starter audit guide. Identify your most critical vulnerabilities before they become threats — no commitment required.
              </p>
              <ul className="mt-4 space-y-2">
                {["Security posture assessment checklist", "Top 10 vulnerability indicators", "Quick remediation action plan"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative space-y-4"
            >
              <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="lead-website">Website</label>
                <Input
                  id="lead-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </div>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name *" maxLength={100} className="bg-background/50 border-border/50" />
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address *" maxLength={255} className="bg-background/50 border-border/50" />
              <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company (optional)" maxLength={100} className="bg-background/50 border-border/50" />
              <Button type="submit" variant="glow" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
                {loading ? "Submitting..." : "Download Free Report"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">No spam. Unsubscribe anytime.</p>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
