import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import SecurityProcess from "@/components/sections/SecurityProcess";
import LeadMagnet from "@/components/sections/LeadMagnet";
import GlobalReach from "@/components/sections/GlobalReach";
import MidPageCTA from "@/components/sections/MidPageCTA";
import heroBg from "@/assets/hero-cyber.jpg";
import {
  ShieldCheck, Eye, Cloud, Search, FileCheck, AlertTriangle,
  Lock, Users, MessageSquare, Globe, Server
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const services = [
  { icon: Search, title: "Vulnerability Assessment", desc: "Find and prioritize the gaps in your systems before attackers do." },
  { icon: AlertTriangle, title: "Penetration Testing", desc: "Real-world attack simulations that reveal what automated scanners miss." },
  { icon: Eye, title: "Managed Security Services", desc: "24/7 monitoring and SOC operations so threats don't go unnoticed." },
  { icon: Cloud, title: "Cloud Security", desc: "Stop misconfigurations before they become breaches across AWS, Azure, and GCP." },
  { icon: FileCheck, title: "Digital Forensics & IR", desc: "Rapid response and investigation when breaches occur." },
  { icon: Server, title: "Compliance & Security Audit", desc: "ISO 27001, NIST, and GDPR-aligned audits, GRC advisory, and certification preparation." },
  { icon: ShieldCheck, title: "Risk Management", desc: "Understand your risk landscape and act on it with a clear remediation plan." },
];

const whyUs = [
  {
    icon: MessageSquare,
    title: "We speak your language",
    desc: "No jargon, no fear-mongering. We explain what we find, what it means, and what to do about it — in plain English.",
  },
  {
    icon: ShieldCheck,
    title: "We work the way you do",
    desc: "Remote, on-site, or hybrid. Project-based, retainer, or on-demand. We fit around your business, not the other way around.",
  },
  {
    icon: Users,
    title: "No company is too small",
    desc: "Most security firms ignore you until you're enterprise. We built TrustWarden specifically for startups and growing companies that need real protection now.",
  },
  {
    icon: Globe,
    title: "Global reach, local accountability",
    desc: "Coordinated from Alberta with delivery partners across North America and beyond. One team, one point of contact, wherever you are.",
  },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Cybersecurity digital shield" width={1920} height={1080} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
      </div>
      <div className="absolute inset-0 grid-cyber opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest uppercase text-accent mb-6">
            <Lock className="h-3.5 w-3.5" /> Cybersecurity Excellence
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
            Most breaches don't start with{" "}
            <span className="gradient-text">sophisticated attacks.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            They start with gaps you didn't know you had. TrustWarden finds them first — penetration testing, vulnerability assessments, and managed security built for startups and growing companies in Canada and beyond.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/contact">
              <Button variant="glow" size="lg">Get Your Free Security Report</Button>
            </Link>
            <Link to="/contact">
              <Button variant="glow-outline" size="lg">Book a Consultation</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>


    {/* Services */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="Our Services"
          title="Exactly what you need. Nothing you don't."
          description="End-to-end cybersecurity services designed to protect every layer of your digital infrastructure."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div key={s.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Link to="/services" className="glass rounded-xl p-6 h-full flex flex-col gap-4 group hover:border-primary/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Mid CTA */}
    <MidPageCTA
      title="You don't know what you don't know."
      description="A 30-minute consultation with TrustWarden could surface risks you've never considered — at no cost and no obligation."
      cta="Book My Free Consultation"
    />

    {/* Process */}
    <SecurityProcess />

    {/* Why TrustWarden */}
    <section className="py-20 md:py-28 bg-card/50">
      <div className="container mx-auto px-4">
        <SectionHeading label="Why TrustWarden" title="Security that works the way you work" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item, i) => (
            <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Lead Magnet */}
    <LeadMagnet />

    {/* Global Reach */}
    <GlobalReach />

  </Layout>
);

export default Index;
