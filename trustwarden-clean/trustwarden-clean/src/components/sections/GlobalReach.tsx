import { motion } from "framer-motion";
import { Globe, MapPin } from "lucide-react";

const GlobalReach = () => (
  <section className="py-16 border-y border-border/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center"
      >
        <Globe className="h-8 w-8 text-accent mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Serving Businesses in Canada, the US, and Globally</h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          TrustWarden is built for startups and mid-size companies at every stage. No company is too small to protect, and there's no ceiling on who we work with.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {["Canada", "United States", "Global"].map((loc) => (
            <span key={loc} className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground glass rounded-full px-4 py-2">
              <MapPin className="h-3 w-3 text-primary" /> {loc}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default GlobalReach;
