import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Search, Shield, Crosshair, FileText, Wrench } from "lucide-react";

const steps = [
  { icon: Search, title: "Discovery", desc: "Understand your systems, architecture, and risk landscape." },
  { icon: Shield, title: "Assessment", desc: "Identify vulnerabilities across your entire attack surface." },
  { icon: Crosshair, title: "Ethical Exploitation", desc: "Simulate real-world attacks to validate findings." },
  { icon: FileText, title: "Reporting", desc: "Deliver detailed findings with severity ratings." },
  { icon: Wrench, title: "Remediation", desc: "Help fix, harden, and secure your systems." },
];

const SecurityProcess = () => (
  <section className="py-20 md:py-28">
    <div className="container mx-auto px-4">
      <SectionHeading label="Our Process" title="How We Protect You" description="A proven five-step methodology that delivers results for businesses of every size." />
      <div className="relative">
        {/* Timeline line - desktop */}
        <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-4 relative z-10">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xs font-mono text-accent mb-1 block">0{i + 1}</span>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SecurityProcess;
