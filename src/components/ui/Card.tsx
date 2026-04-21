// src/components/ui/Card.tsx
import { motion } from "framer-motion";
import React from "react";

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-gray-900 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-800 transition h-[200px] flex flex-col justify-between"
    >
      {children}
    </motion.div>
  );
}
