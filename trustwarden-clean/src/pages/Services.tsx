import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import MidPageCTA from "@/components/sections/MidPageCTA";
import {
  Search, AlertTriangle, Eye, Cloud, FileCheck, Server, ShieldCheck, ChevronRight
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const services = [
  {
    icon: Search,
    title: "Vulnerability Assessment",
    what: "A systematic process of identifying, quantifying, and prioritizing security vulnerabilities in your systems, networks, and applications.",
    why: "Unpatched vulnerabilities are the #1 entry point for attackers. Proactive assessment reduces your attack surface before exploitation occurs.",
    benefits: ["Comprehensive vulnerability scanning", "Prioritized risk reporting", "Remediation roadmap", "Continuous monitoring options"],
  },
  {
    icon: AlertTriangle,
    title: "Penetration Testing",
    what: "Controlled, simulated cyberattacks against your systems to evaluate the effectiveness of your security controls and identify exploitable weaknesses.",
    why: "Real-world attack simulations reveal gaps that automated scanners miss, giving you actionable intelligence to strengthen defenses.",
    benefits: ["Black, grey & white box testing", "Web & mobile app testing", "Network & infrastructure testing", "Detailed exploitation reports"],
  },
  {
    icon: Eye,
    title: "Managed Security Services (SOC / Monitoring)",
    what: "24/7 Security Operations Center monitoring with real-time threat detection, analysis, and incident response capabilities.",
    why: "Cyber threats don't operate on business hours. Continuous monitoring ensures rapid detection and response to minimize damage.",
    benefits: ["24/7 SOC monitoring", "SIEM management", "Threat intelligence feeds", "Incident escalation & response"],
  },
  {
    icon: Cloud,
    title: "Cloud Security & Infrastructure Protection",
    what: "End-to-end security for cloud environments including configuration audits, identity management, and workload protection across AWS, Azure, and GCP.",
    why: "Cloud misconfigurations are responsible for a majority of breaches. Proper cloud security ensures your data stays protected at scale.",
    benefits: ["Cloud configuration review", "Identity & access management", "Container & workload security", "Multi-cloud security posture"],
  },
  {
    icon: FileCheck,
    title: "Digital Forensics & Incident Response",
    what: "Rapid investigation and containment of security incidents, with thorough forensic analysis to understand the scope and impact of breaches.",
    why: "When a breach occurs, every minute counts. Fast, expert response minimizes financial loss and reputational damage.",
    benefits: ["24/7 incident response team", "Malware analysis & reverse engineering", "Evidence preservation & chain of custody", "Post-incident reporting"],
  },
  {
    icon: Server,
    title: "Compliance & Security Audit",
    what: "Comprehensive audits of your IT infrastructure and security controls combined with GRC advisory — covering ISO 27001, NIST CSF, and GDPR-aligned governance, risk, and compliance.",
    why: "Compliance isn't just a checkbox — it's a foundation for trust. Our audits ensure you meet regulatory requirements while building a mature security posture clients and partners can rely on.",
    benefits: ["ISO 27001 gap analysis & implementation", "Compliance readiness assessment", "Security policy development", "Audit preparation & certification support"],
  },
  {
    icon: ShieldCheck,
    title: "Risk Management & Remediation",
    what: "Strategic assessment of organizational risk with actionable remediation plans to reduce exposure and strengthen your overall security posture.",
    why: "Understanding your risk landscape is essential for informed decision-making and resource allocation in cybersecurity.",
    benefits: ["Enterprise risk assessment", "Threat modeling", "Remediation planning & tracking", "Executive risk reporting"],
  },
];

const Services = () => (
  <Layout>
    {/* Hero */}
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-cyber opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block text-xs font-mono font-semibold tracking-widest uppercase text-accent mb-4">Our Services</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Cybersecurity <span className="gradient-text">Solutions</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Comprehensive penetration testing, vulnerability assessment, and managed security services for businesses across Canada and globally.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Service Sections */}
    <section className="pb-10">
      <div className="container mx-auto px-4 space-y-16">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`glass rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="flex-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-3">{s.title}</h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-foreground font-semibold mb-1">What It Is</h3>
                  <p>{s.what}</p>
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">Why It Matters</h3>
                  <p>{s.why}</p>
                </div>
              </div>
              <Link to="/contact" className="inline-block mt-6">
                <Button variant="glow" size="sm">Get Your System Tested Today <ChevronRight className="h-3.5 w-3.5" /></Button>
              </Link>
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <h3 className="text-sm font-semibold mb-3">Key Benefits</h3>
                <ul className="space-y-2">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Mid CTA */}
    <MidPageCTA title="Built for Startups and Growing Companies" description="Our Alberta-based team delivers professional security testing for businesses at every stage — from seed-stage startups to mid-size organizations scaling fast." cta="Get Your System Tested Today" />

    {/* CTA */}
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4 text-center">
        <SectionHeading title="Need a Custom Security Solution?" description="Every business is unique. Let our experts design a tailored cybersecurity strategy for your organization." />
        <Link to="/contact">
          <Button variant="glow" size="lg">Book a Free Security Consultation</Button>
        </Link>
      </div>
    </section>
  </Layout>
);

export default Services;
