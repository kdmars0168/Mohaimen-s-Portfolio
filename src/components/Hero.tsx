
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <span className="inline-block px-3 py-1 text-sm font-medium bg-accent text-accent-foreground rounded-full mb-6">
          Portfolio
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Crafting Digital Experiences Through Thoughtful Project Management
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
          Transforming ideas into impactful solutions with precision, creativity, and attention to detail.
        </p>
      </motion.div>
    </section>
  );
};
