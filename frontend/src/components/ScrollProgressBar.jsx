import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  // Track document scroll progress (0 to 1)
  const { scrollYProgress } = useScroll();

  // Smooth spring for elegant easing
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 h-[3px] w-screen z-[1000] pointer-events-none"
      style={{
        transformOrigin: "left",
        scaleX,
      }}
    >
      <div className="h-full w-full bg-gradient-to-r from-red-600 via-red-500 to-white/70" />
    </motion.div>
  );
}
