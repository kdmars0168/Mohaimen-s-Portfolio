import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background gradient animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}  // Increase opacity for better visibility
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-gray-300/50 to-white dark:from-accent/40 dark:to-background blur-3xl"
      />

      {/* Large animated floating shapes */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gray-400/30 dark:bg-accent/30 blur-xl"
          style={{
            width: `${100 + i * 50}vw`,
            height: `${100 + i * 50}vh`,
            top: i % 2 === 0 ? "-30%" : "40%",
            left: i % 2 === 0 ? "-20%" : "50%",
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.9, 1],
            rotate: [0, 180, 360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};
