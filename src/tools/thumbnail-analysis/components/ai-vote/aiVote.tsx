import { RotateCw } from "lucide-react";
import { VideoView } from "../../hooks/useVideoSearch";
import { selectedVideo, VirtualUser } from "../../types/aiVote";
import { VirtualUserList } from "./VirtualUserList";
import { VoteTargetVideos } from "./voteTargetVideos";

type AiVoteProps = {
  videos: VideoView[];
  title: string;
  targetUserRules: string;
  setTargetUserRules: (rules: string) => void;
  generateVirtualUsers: () => Promise<void>;
  virtualUsers: VirtualUser[];
  handleSelectVideos: (video: VideoView) => void;
  selectedVideos: selectedVideo[];
  aiVote: () => Promise<void>;
  initializeSelectedVideos: () => void;
};

export const AiVote = ({
  videos,
  title,
  targetUserRules,
  setTargetUserRules,
  generateVirtualUsers,
  virtualUsers,
  handleSelectVideos,
  selectedVideos,
  aiVote,
  initializeSelectedVideos,
}: AiVoteProps) => {
  return (
    <>
      <p className="font-bold text-xl mt-10">AI投票</p>
      <div className="flex items-center justify-between">
        <p className="mb-2 text-gray-500">
          アップロードしたサムネイルをAIが他動画と比較し、投票・フィードバックを行います
        </p>
        {selectedVideos.length > 1 && (
          <button className="btn mb-2" onClick={initializeSelectedVideos}>
            <RotateCw />
          </button>
        )}
      </div>
      <VoteTargetVideos
        videos={videos}
        title={title}
        handleSelectVideos={handleSelectVideos}
        selectedVideos={selectedVideos}
      />
      {videos.length > 0 && (
        <VirtualUserList
          targetUserRules={targetUserRules}
          setTargetUserRules={setTargetUserRules}
          generateVirtualUsers={generateVirtualUsers}
          virtualUsers={virtualUsers}
        />
      )}
      <button className="btn btn-link" onClick={aiVote}>
        AI投票テスト
      </button>
    </>
  );
};
