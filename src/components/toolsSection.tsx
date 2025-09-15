import {
  ChartLine,
  DoorClosedIcon,
  DoorOpen,
  FileQuestionIcon,
  GalleryThumbnails,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

export default function ToolsSection() {
  const router = useRouter();
  const tools = [
    {
      id: "demand-analysis",
      title: "AI需要分析ツール",
      description:
        "YouTubeから需要のある動画を検索し、なぜ再生されているのかを分析します。",
      icon: <ChartLine className="text-green-600" />,
      route: "/demand-analysis",
      status: "available",
      features: ["需要分析", "競合調査", "トレンド予測"],
    },
    {
      id: "thumbnail-tool",
      title: "AIサムネイル比較ツール",
      description:
        "あなたのサムネイルを他の人気サムネイルと比較し、改善点を提示します。(beta版)",
      icon: <GalleryThumbnails className="text-blue-600" />,
      route: "/thumbnail-analysis",
      status: "available",
      features: ["テンプレート", "AI投票 & 改善", "プレビュー"],
    },
    {
      id: "script-generator",
      title: "in Progress...",
      description:
        "MCPやAIエージェントを活用したツール案を考え中です。(ツール案募集中)",
      icon: <FileQuestionIcon className="text-gray-400" />,
      route: "/demo-tool",
      status: "coming-soon",
      features: ["...", "...", "..."],
    },
  ];
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center my-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            強力なツール
          </span>
        </h2>
        <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto font-bold">
          AI技術を駆使した革新的なツールで、
          <br />
          あなたのYouTubeチャンネルを次のレベルへ引き上げます
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-start border border-gray-100 transition-shadow hover:shadow-xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div>{tool.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {tool.title}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">{tool.description}</p>
            <ul className="text-sm text-gray-500 mb-6 list-disc pl-5">
              {tool.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button
              onClick={() =>
                tool.status === "available" && router.push(tool.route)
              }
              disabled={tool.status !== "available"}
              className="btn flex items-center gap-2 px-4 py-2 rounded-md font-bold text-white transition bg-neutral"
            >
              {tool.status === "available" ? (
                <DoorOpen size={18} />
              ) : (
                <DoorClosedIcon />
              )}
              {tool.status === "available" ? "使ってみる" : "準備中"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
