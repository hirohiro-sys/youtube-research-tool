import { motion } from "framer-motion";
import { Play, ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="hero min-h-screen bg-gradient-to-br from-white via-red-50 to-gray-50 relative overflow-hidden">
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
              <motion.div className="p-4 bg-red-600 rounded-full shadow-2xl">
                <Play
                  className="w-5 h-5 md:w-10 md:h-10 text-white"
                  fill="white"
                />
              </motion.div>
              <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                Youtube動画作成支援ツール
              </h1>
            </div>

            <p className="font-semibold text-xs md:text-lg text-gray-600 mb-8 leading-relaxed flex items-center justify-center">
              <span className="text-sm md:text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
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
            <motion.button className="btn bg-gradient-to-r from-red-500 to-yellow-500 hover:bg-black text-white btn-md font-bold shadow-2xl">
              今すぐ始める
              <ChevronRight />
            </motion.button>
            <motion.button className="btn btn-outline btn-md w-36 bg-gray-50 text-gray-700 border-gray-700 hover:bg-gray-700 hover:text-white">
              詳細を見る
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
