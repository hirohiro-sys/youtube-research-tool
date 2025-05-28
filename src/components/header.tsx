"use client";

import { motion } from "motion/react";
import { BookOpen, MonitorPlay } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 w-full bg-black/80 shadow-lg z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <MonitorPlay className="h-6 w-6 text-red-500" />
            <h1 className="text-base md:text-xl font-bold text-white">
              YouTube需要分析ツール
            </h1>
          </motion.button>
          <button className="btn text-white bg-stone-500 border-none">
            <BookOpen />
            <span className="hidden md:block">このツールでできること （準備中）</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
