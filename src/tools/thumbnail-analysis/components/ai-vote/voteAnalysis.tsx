import { Crown, UserPlus } from "lucide-react";
import ReactMarkdown from "react-markdown";

type VoteAnalysisProps = {
  topVideoAnalysis: string;
  uploadedVideosFeedback: string;
  isVoting: boolean;
};

export const VoteAnalysis = ({
  topVideoAnalysis,
  uploadedVideosFeedback,
  isVoting,
}: VoteAnalysisProps) => {
  if (isVoting) {
    return (
      <div className="mt-8 space-y-6 animate-pulse">
        <div>
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="space-y-2 bg-gray-100 p-4 rounded-md">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
        <div>
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="space-y-2 bg-gray-100 p-4 rounded-md">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {topVideoAnalysis && (
        <div>
          <h3 className="text-lg font-semibold pb-2 flex items-center gap-2">
            <Crown />
            最もクリックされた動画の分析
          </h3>
          <div className="bg-gray-100 p-4 rounded-md text-gray-800 prose max-w-none text-sm md:text-base break-words">
            <ReactMarkdown>{topVideoAnalysis}</ReactMarkdown>
          </div>
        </div>
      )}
      {uploadedVideosFeedback && (
        <div>
          <h3 className="text-lg font-semibold pb-2 flex items-center gap-2">
            <UserPlus />
            アップロードされた動画へのフィードバック
          </h3>
          <div className="bg-gray-100 p-4 rounded-md text-gray-800 prose max-w-none text-sm md:text-base break-words">
            <ReactMarkdown>{uploadedVideosFeedback}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};
