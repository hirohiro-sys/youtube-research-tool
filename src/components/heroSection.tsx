"use client";

import { motion } from "framer-motion";
import { Play, TrendingUp, Image, Zap, DoorOpen } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="hero min-h-screen bg-gradient-to-br from-white via-red-50 to-gray-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-red-600 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-60 right-40 w-24 h-24 bg-red-300 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="hero-content text-center z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <motion.div
                className="p-4 bg-red-600 rounded-full shadow-2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Play className="w-12 h-12 text-white" fill="white" />
              </motion.div>
              <h1 className="text-6xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                Youtube動画作成支援ツール
              </h1>
            </div>

            <p className="font-semibold text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed flex items-center justify-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                生成AI
              </span>
              を活用した、次世代クリエイタープラットフォームです
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              className="btn border-gray-500 text-white bg-gray-600 btn-md font-bold shadow-2xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255, 0, 0, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <DoorOpen />
              今すぐ始める
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 text-gray-600"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span>AI需要分析</span>
            </div>
            <div className="flex items-center gap-2">
              <Image className="w-5 h-5 text-blue-400" />
              <span>AIサムネイル比較</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>動画作成サポート</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
