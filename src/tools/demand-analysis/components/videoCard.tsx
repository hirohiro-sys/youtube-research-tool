import {
  BotMessageSquare,
  Eye,
  ThumbsUp,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { AiAnalysisModal } from "./aiAnalysisModal";
import { Video } from "../types/youtubeApiTypes";

export const VideoCard = ({ video }: { video: Video }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="card bg-base-100 shadow-lg ring-1 ring-gray-200"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.1 }}
      >
        <figure className="relative">
          <Image
            src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
            alt={video.title}
            className="w-full h-48 object-cover"
            width={480}
            height={270}
          />
          <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-50 text-white font-bold font-mono p-2 rounded-xl flex items-center text-sm">
            <ThumbsUp className="inline-block mr-2 text-pink-500" />
            {Number(video.likeCount).toLocaleString()}
          </div>
        </figure>

        <div className="card-body p-6">
          <h2 className="card-title">
            <Link
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-600"
            >
              {video.title}
            </Link>
          </h2>
          <div className="flex py-3 gap-8">
            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-4 font-mono whitespace-nowrap">
                <Eye />
                {Number(video.viewCount).toLocaleString()} 回
              </p>
              <p className="flex items-center gap-4 font-mono whitespace-nowrap">
                <Users />
                {Number(video.subscriberCount).toLocaleString()} 人
              </p>
            </div>
            <p className="flex items-center gap-4 font-mono text-green-600 font-bold text-lg md:text-xl whitespace-nowrap">
              <TrendingUp />
              {Number(video.subscriberCount) > 0
                ? `${(
                    Number(video.viewCount) / Number(video.subscriberCount)
                  ).toFixed(1)} 倍`
                : "倍率なし"}
            </p>
          </div>
          <button
            className="btn text-white mt-auto bg-gradient-to-r from-indigo-400 to-cyan-400"
            onClick={() => setIsOpen(true)}
          >
            <BotMessageSquare />
            AI分析
          </button>
        </div>
      </motion.div>
      <AiAnalysisModal isOpen={isOpen} setIsOpen={setIsOpen} video={video} />
    </>
  );
};
