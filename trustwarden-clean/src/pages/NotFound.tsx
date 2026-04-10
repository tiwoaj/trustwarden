import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { ShieldX } from "lucide-react";

const NotFound = () => (
  <Layout>
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-cyber opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldX className="h-10 w-10 text-primary" />
            </div>
          </div>
          <p className="text-xs font-mono font-semibold tracking-widest uppercase text-accent mb-4">404 — Page Not Found</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            This page doesn't <span className="gradient-text">exist.</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
            The page you're looking for may have been moved, deleted, or never existed. Let's get you back on track.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button variant="glow" size="lg">Back to Home</Button>
            </Link>
            <Link to="/contact">
              <Button variant="glow-outline" size="lg">Contact Us</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default NotFound;
