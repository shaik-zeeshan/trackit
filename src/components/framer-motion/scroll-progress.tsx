"use client";

import { motion, useScroll } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-4 bg-foreground origin-[0%]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};
