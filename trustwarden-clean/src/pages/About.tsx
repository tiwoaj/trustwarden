import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import MidPageCTA from "@/components/sections/MidPageCTA";
import { Shield, Target, Eye, Globe, Users, Award, Building2, MapPin, Handshake } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const values = [
  { icon: Shield, title: "Security First", desc: "Every decision is guided by our commitment to protecting our clients' digital assets." },
  { icon: Target, title: "Precision", desc: "We deliver targeted, effective solutions — no unnecessary complexity." },
  { icon: Users, title: "Partnership", desc: "We work alongside your team as trusted advisors, not just vendors." },
  { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest industry standards in everything we do." },
];

const sectors = [
  { title: "Financial Institutions", desc: "Security testing and risk assessment for sensitive financial systems." },
  { title: "Government & Public Sector", desc: "VAPT and infrastructure security for digital government services." },
  { title: "SMEs & Startups", desc: "Security hardening and vulnerability assessments for growing businesses." },
  { title: "NGOs & Development Organizations", desc: "Infrastructure security and risk mitigation for mission-driven organizations." },
];

const engagementModels = [
  { title: "Project-Based", desc: "Scoped, fixed-term engagements for specific security needs — assessments, audits, or penetration tests." },
  { title: "Retainer-Based", desc: "Ongoing managed security services with continuous monitoring and priority access to our team." },
  { title: "On-Demand", desc: "Flexible advisory and security testing when you need it, with no long-term commitment required." },
];

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-cyber opacity-20" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
          <span className="inline-block text-xs font-mono font-semibold tracking-widest uppercase text-accent mb-4">About Us</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Defending the <span className="gradient-text">Digital Frontier</span>
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            TrustWarden is a modern cybersecurity company in Alberta delivering global cybersecurity solutions — built on expertise, reliability, and a relentless commitment to protecting businesses from evolving cyber threats.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Story */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>Founded by seasoned cybersecurity professionals, TrustWarden was built for startups and mid-size companies — businesses that need enterprise-grade security without the enterprise price tag. There's no company too small or too large; we meet you where you are.</p>
              <p>We operate a hybrid global delivery model — coordinated from Alberta, Canada and backed by a network of vetted cybersecurity specialists across key regions. This gives us the flexibility to serve clients remotely, on-site, or in a hybrid arrangement, with no geographical limitations on where we operate.</p>
              <p>We combine deep technical expertise with a proactive, intelligence-driven approach to security — aligned with ISO 27001, the NIST Cybersecurity Framework, and GDPR-conscious data handling practices.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-8">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Our Mission</h3>
                </div>
                <p className="text-sm text-muted-foreground">To make enterprise-grade cybersecurity accessible to startups and mid-size companies — with no ceiling on who we serve.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold">Our Vision</h3>
                </div>
                <p className="text-sm text-muted-foreground">To become a trusted global cybersecurity partner for organizations seeking reliable, adaptive, and future-ready digital protection.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Compliance Frameworks</h3>
                </div>
                <p className="text-sm text-muted-foreground">We operate in alignment with ISO 27001, NIST CSF, and GDPR-conscious data handling practices across all engagements.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Sectors */}
    <section className="py-16 md:py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <SectionHeading label="Who We Serve" title="Target Sectors" description="Our team's combined expertise and partner network equip us to serve organizations across a range of industries." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((s, i) => (
            <motion.div key={s.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Engagement Models */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeading label="How We Work" title="Engagement Models" description="Flexible options to suit your needs — whether you need a one-time assessment or ongoing protection." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {engagementModels.map((m, i) => (
            <motion.div key={m.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-3 text-primary">{m.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Partners */}
    <section className="py-16 md:py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <SectionHeading label="Our Partners" title="A Global Delivery Network" description="TrustWarden is backed by strategic partners that extend our reach and deepen our delivery capability." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Dorots Ltd</h3>
                <p className="text-xs text-muted-foreground">Alberta, Canada</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">An Alberta-based business solutions and software development firm. As a strategic partner, Dorots complements TrustWarden's cybersecurity expertise with strong technical delivery and business development capabilities, enabling a cohesive end-to-end service offering for our clients.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Handshake className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Delivery Partner</h3>
                <p className="text-xs text-muted-foreground">Lagos, Nigeria</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">A leading cybersecurity firm with a proven track record across public and private sectors — including high-stakes VAPT for government agencies and security architecture for fintech startups in the capital markets space. Their depth of experience in regulated, high-risk environments directly enhances the quality and credibility of TrustWarden's delivery network.</p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Mid CTA */}
    <MidPageCTA />

    {/* Values */}
    <section className="py-16 md:py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <SectionHeading label="Our Values" title="What Drives Us" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div key={v.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <v.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 grid-cyber opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/15 blur-[100px]" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <SectionHeading title="Ready to Strengthen Your Security?" description="Let's discuss how TrustWarden can protect your business." />
        <Link to="/contact">
          <Button variant="glow" size="lg">Book a Free Security Consultation</Button>
        </Link>
      </div>
    </section>
  </Layout>
);

export default About;
