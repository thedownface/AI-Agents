"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface StoryCardProps {
  children: ReactNode;
  isVisible: boolean;
  direction?: "up" | "right" | "left";
  delay?: number;
  className?: string;
}

export default function StoryCard({
  children,
  isVisible,
  direction = "up",
  delay = 0,
  className = "",
}: StoryCardProps) {
  const yIn = direction === "up" ? 60 : 0;
  const xIn = direction === "right" ? -60 : direction === "left" ? 60 : 0;
  const yOut = direction === "up" ? -40 : 0;
  const xOut = direction === "right" ? 60 : direction === "left" ? -60 : 0;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="card"
          initial={{ opacity: 0, y: yIn, x: xIn }}
          animate={{ opacity: 1, y: 0, x: 0, transition: { duration: 0.7, delay } }}
          exit={{ opacity: 0, y: yOut, x: xOut, transition: { duration: 0.4 } }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
