"use client";

import { MonitorPlay } from "lucide-react";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-100 footer sm:footer-horizontal text-base-content p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      <aside>
        <MonitorPlay className="h-8 w-8 text-red-500" />
        <p>
          生成AIを用いてYoutubeの動画制作を一気通貫で支援します。
          <br />
          YouTube動画作成支援ツール © {new Date().getFullYear()}
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Tools</h6>
        <a className="link link-hover">Demand Analysis</a>
        <a className="link link-hover">Thumbnail Analysis</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
      </nav>
    </motion.footer>
  );
}
