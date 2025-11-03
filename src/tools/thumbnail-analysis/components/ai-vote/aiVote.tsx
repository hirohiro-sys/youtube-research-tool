import { VirtualUser } from "../../hooks/useAiVote";
import { VideoView } from "../../hooks/useVideoSearch";
import { selectedVideo } from "../../types/aiVote";
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
}: AiVoteProps) => {
  return (
    <>
      <p className="font-bold text-xl mt-10">AI投票</p>
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
          generateVirtualUsers={generateVirtualUsers}
          virtualUsers={virtualUsers}
        />
      )}
    </>
  );
};
