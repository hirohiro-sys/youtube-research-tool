"use client";

import {
  ChartLine,
  DoorOpen,
  GalleryThumbnails,
  DoorClosedIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function TopPage() {
  const router = useRouter();

  const tools = [
    {
      id: "demand-analysis",
      title: "AI需要分析ツール",
      description:
        "YouTubeの需要を分析し、トレンドキーワードや競合チャンネルの動向を把握できます。",
      icon: <ChartLine />,
      route: "/demand-analysis",
      status: "available",
      features: ["キーワード分析", "競合調査", "トレンド予測"],
    },
    {
      id: "thumbnail-tool",
      title: "AIサムネイル分析ツール",
      description:
        "魅力的なサムネイルを作成し、クリック率を向上させるためのデザインツールです。",
      icon: <GalleryThumbnails />,
      route: "/thumbnail-tool",
      status: "coming-soon",
      features: ["テンプレート", "AI最適化", "A/Bテスト"],
    },
  ];

  return (
    <div className="pt-30 flex-grow">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          プロフェッショナルな動画制作ツール
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          需要分析からサムネイル最適化まで、YouTubeチャンネルの成長に必要なすべてのツールを一つのプラットフォームで提供します。
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-start border border-gray-100"
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
              className={`btn flex items-center gap-2 px-4 py-2 rounded-md font-medium text-white transition
                ${
                  tool.status === "available"
                    ? "bg-gradient-to-r from-red-500 to-orange-500"
                    : "bg-gray-600 cursor-not-allowed" // cssが当たってないかも
                }`}
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
    </div>
  );
}
