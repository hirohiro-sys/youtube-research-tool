"use client";

import { motion } from "motion/react";
import { MonitorPlay, Info } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 w-full bg-black/80 shadow-lg z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between md:justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <MonitorPlay className="h-6 w-6 text-red-500" />
            <h1 className="text-base md:text-xl font-bold text-white">
              YouTube需要分析ツール
            </h1>
          </motion.div>
          <div
            className="tooltip tooltip-left md:tooltip-bottom mr-4"
            data-tip="Youtubeではチャンネル登録者数の3倍の再生数をもつ動画は需要があると言われています。"
          >
            <button className="btn rounded-2xl px-2 md:px-4">
              <Info />
              <span className="hidden md:inline">需要のある動画とは？</span>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
