"use client";

import { motion } from "motion/react";
import { MonitorPlay, UserRound } from "lucide-react";
import Link from "next/link";

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
          <Link
            href="https://x.com/qhcSEiFAQg5454"
            target="_blank"
            rel="noopener noreferrer"
            className="btn text-white bg-stone-500 border-none flex items-center space-x-2 px-4 py-2 rounded"
          >
            <UserRound />
            <span className="hidden md:block">お問い合わせ</span>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
