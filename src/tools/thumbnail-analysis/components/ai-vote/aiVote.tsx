import { Bot } from "lucide-react";
import { VideoView } from "../../hooks/useVideoSearch";
import { selectedVideo, VirtualUser } from "../../types/aiVote";
import { VirtualUserList } from "./VirtualUserList";
import { VoteTargetVideos } from "./voteTargetVideos";
import { VoteAnalysis } from "./voteAnalysis";

type AiVoteProps = {
  videos: VideoView[];
  title: string;
  targetUserRules: string;
  setTargetUserRules: (rules: string) => void;
  handleGenerateVirtualUsers: () => Promise<void>;
  virtualUsers: VirtualUser[];
  handleSelectVideos: (video: VideoView) => void;
  selectedVideos: selectedVideo[];
  handleAiVote: () => Promise<void>;
  topVideoAnalysis: string;
  uploadedVideosFeedback: string;
  isGeneratingVirtualUsers: boolean;
  isVoting: boolean;
};

export const AiVote = ({
  videos,
  title,
  targetUserRules,
  setTargetUserRules,
  handleGenerateVirtualUsers,
  virtualUsers,
  handleSelectVideos,
  selectedVideos,
  handleAiVote,
  topVideoAnalysis,
  uploadedVideosFeedback,
  isGeneratingVirtualUsers,
  isVoting,
}: AiVoteProps) => {
  return (
    <>
      <p className="font-bold text-xl mt-10">AI投票(beta版)</p>
      <p className="mb-2 text-gray-500">
        アップロードしたサムネイルをAIが他動画と比較し、投票・フィードバックを行います
      </p>

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
          handleGenerateVirtualUsers={handleGenerateVirtualUsers}
          virtualUsers={virtualUsers}
          isGeneratingVirtualUsers={isGeneratingVirtualUsers}
        />
      )}
      <button
        className="btn btn-outline btn-primary mt-4"
        onClick={handleAiVote}
        disabled={
          selectedVideos.length !== 5 ||
          virtualUsers.length === 0 ||
          !title ||
          isVoting
        }
      >
        <Bot />
        {isVoting ? "投票中..." : "AI投票を開始する"}
      </button>
      <VoteAnalysis
        topVideoAnalysis={topVideoAnalysis}
        uploadedVideosFeedback={uploadedVideosFeedback}
        isVoting={isVoting}
      />
    </>
  );
};
