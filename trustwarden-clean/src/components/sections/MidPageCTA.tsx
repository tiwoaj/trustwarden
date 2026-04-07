import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface MidPageCTAProps {
  title?: string;
  description?: string;
  cta?: string;
}

const MidPageCTA = ({
  title = "Ready to Secure Your Infrastructure?",
  description = "Book a free consultation with our cybersecurity experts and get a tailored protection strategy.",
  cta = "Book a Free Security Consultation",
}: MidPageCTAProps) => (
  <section className="py-16 relative overflow-hidden">
    <div className="absolute inset-0 gradient-primary opacity-10" />
    <div className="container mx-auto px-4 relative z-10 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">{description}</p>
        <Link to="/contact">
          <Button variant="glow" size="lg">{cta}</Button>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default MidPageCTA;
