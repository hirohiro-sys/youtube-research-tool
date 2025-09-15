"use client";

import { motion } from "framer-motion";
import { Play, Mail, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <motion.div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-600 rounded-full">
                <Play className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                Youtube動画作成支援ツール
              </span>
            </motion.div>
            <p className="font-semibold mb-6 text-sm md:text-md">
              生成AIを活用した、次世代クリエイタープラットフォームです
            </p>
            <div className="flex gap-4">
              {[
                { icon: Mail, href: "mailto:katohiro8843@icloud.com" },
                { icon: Twitter, href: "#" },
                { icon: Github, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="p-2 bg-gray-700 rounded-lg transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-300">ツール</h4>
            <ul className="space-y-2">
              {["AI需要分析", "AIサムネイル比較", "準備中..."].map(
                (tool, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {tool}
                    </motion.a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-300">
              サポート
            </h4>
            <ul className="space-y-2">
              {["利用規約", "プライバシーポリシー", "お問い合わせ"].map(
                (item, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 text-center">
          <p className="text-gray-300">
            © 2025 Youtube動画作成支援ツール. All rights reserved. |
            <span className="text-red-300 ml-2">Made with ❤️ for Creators</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
