"use client";

import { Video } from "@/types/youtubeApiTypes";
import { BotMessageSquare, SquareX } from "lucide-react";
import { useAiAnalysis } from "../hooks/useAiAnalysis";
import ReactMarkdown from "react-markdown";

interface AiAnalysisModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  video: Video;
}

export const AiAnalysisModal = ({
  isOpen,
  setIsOpen,
  video,
}: AiAnalysisModalProps) => {
  const { loading, summary, errorMessage, analyze } = useAiAnalysis(video);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between">
          <div className="flex items-center gap-1 mb-3 text-blue-700">
            <BotMessageSquare />
            <h1 className="text-2xl font-bold">AI分析(Beta版)</h1>
          </div>
          <SquareX onClick={() => setIsOpen(false)} />
        </div>
        <p className="text-gray-600 mb-8">
          動画が再生されている理由をAIがコメントから分析し、簡潔に要約してくれます。
        </p>
        <div className="mb-8">
          <p className="whitespace-nowrap font-bold mb-2">対象動画</p>
          <p className="text-sm md:text-base">{video.title}</p>
        </div>

        <>
          {!summary && !errorMessage ? (
            <button
              className="btn bg-gray-600 text-white m-auto block"
              onClick={analyze}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                "分析開始"
              )}
            </button>
          ) : (
            <>
              <p className="font-bold mb-3">分析結果</p>
              <div className="bg-gray-100 p-4 rounded-md text-gray-800 prose max-w-none text-sm md:text-base break-words">
                <ReactMarkdown>{errorMessage || summary || ""}</ReactMarkdown>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};
