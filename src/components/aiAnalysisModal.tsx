import { Video } from "@/types/youtubeApiTypes";
import { BotMessageSquare, SquareX } from "lucide-react";

interface AiAnalysisModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  video: Video;
}

export const AiAnalysisModal = ({
  isOpen,
  setIsOpen,
  video,
}: AiAnalysisModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-3xl w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-1 mb-3 text-blue-700">
            <BotMessageSquare />
            <h1 className="text-2xl font-bold">AI分析</h1>
          </div>
          <SquareX onClick={() => setIsOpen(false)} />
        </div>
        <p className="text-gray-600 mb-8">
          動画が再生されている理由をAIがコメントから分析し、簡潔に要約してくれます。
        </p>
        <div className="flex gap-3 mb-8">
          <p className="whitespace-nowrap font-bold">対象動画</p>
          <p>{video.title}</p>
        </div>
        <button className="btn bg-gray-600 text-white m-auto block">
          分析開始
        </button>
      </div>
    </div>
  );
};
