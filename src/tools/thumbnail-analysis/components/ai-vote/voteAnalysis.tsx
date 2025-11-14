import ReactMarkdown from "react-markdown";

type VoteAnalysisProps = {
  topVideoAnalysis: string;
  uploadedVideosFeedback: string;
};

export const VoteAnalysis = ({
  topVideoAnalysis,
  uploadedVideosFeedback,
}: VoteAnalysisProps) => {
  return (
    <div className="mt-8 space-y-6">
      {topVideoAnalysis && (
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-blue-500 pb-2 mb-4">
            🏆 最もクリックされた動画の分析
          </h3>
          <div className="bg-gray-100 p-4 rounded-md text-gray-800 prose max-w-none text-sm md:text-base break-words">
            <ReactMarkdown>{topVideoAnalysis}</ReactMarkdown>
          </div>
        </div>
      )}
      {uploadedVideosFeedback && (
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-green-500 pb-2 mb-4">
            🚀 アップロードされた動画へのフィードバック
          </h3>
          <div className="bg-gray-100 p-4 rounded-md text-gray-800 prose max-w-none text-sm md:text-base break-words">
            <ReactMarkdown>{uploadedVideosFeedback}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};
