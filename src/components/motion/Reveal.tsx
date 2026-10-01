import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { DUR, EASE, VIEWPORT } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Scroll reveal: fade + rise, transform/opacity only. */
export const Reveal = ({ children, className, delay = 0, y = 24 }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={VIEWPORT}
    transition={{ duration: DUR.base, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);
