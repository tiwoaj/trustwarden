import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { Mail, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", website: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("submit-form", {
        body: {
          form_type: "contact",
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim() || null,
          message: form.message.trim(),
          website: form.website,
        },
      });

      if (error || data?.error) {
        toast({ title: data?.error || "Something went wrong. Please try again.", variant: "destructive" });
        setLoading(false);
        return;
      }
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
      setLoading(false);
      return;
    }

    setLoading(false);
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", company: "", message: "", website: "" });
  };

  return (
    <Layout>
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-cyber opacity-20" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block text-xs font-mono font-semibold tracking-widest uppercase text-accent mb-4">Contact Us</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                Request a <span className="gradient-text">Security Assessment</span>
              </h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Ready to protect your business? Fill out the form and our security experts will reach out within 24 hours.
              </p>
              <div className="mt-8 space-y-4">
                <div className="glass rounded-xl p-4 flex items-center gap-4">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">contact@trustwarden.ca</p>
                  </div>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-xs font-semibold text-foreground mb-1">How quickly can you get started?</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Fast. For most engagements we can scope, schedule, and begin within a week. Book a free consultation and we'll give you a timeline on the first call.</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-5 relative">
                <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <Input
                    id="contact-website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name *</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" maxLength={100} className="bg-background/50 border-border/50" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email *</label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" maxLength={255} className="bg-background/50 border-border/50" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Company</label>
                  <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" maxLength={100} className="bg-background/50 border-border/50" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Message *</label>
                  <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your security needs..." maxLength={2000} rows={4} className="bg-background/50 border-border/50" />
                </div>
                <Button type="submit" variant="glow" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {loading ? "Sending..." : "Request a Security Assessment"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
