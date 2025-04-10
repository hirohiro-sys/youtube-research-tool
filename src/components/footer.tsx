"use client"

import { motion } from "motion/react";

export default function Footer() {
  return (
    <motion.footer
      className="bg-white border-t border-gray-300 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-500">
        YouTube需要分析ツール © {new Date().getFullYear()}
      </div>
    </motion.footer>
  )
}