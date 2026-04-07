import { motion } from "framer-motion";

interface Props {
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
}

const SectionHeading = ({ label, title, description, center = true }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${center ? "text-center" : ""}`}
  >
    {label && (
      <span className="inline-block text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-3">
        {label}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
    {description && (
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">{description}</p>
    )}
  </motion.div>
);

export default SectionHeading;
