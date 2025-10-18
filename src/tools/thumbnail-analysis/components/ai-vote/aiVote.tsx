import { useAiVote } from "../../hooks/useAiVote";
import { VideoView } from "../../hooks/useVideoSearch";
import { PreviewFile } from "../../types/fileTypes";
import { VirtualUserList } from "./VirtualUserList";
import { VoteTargetVideos } from "./voteTargetVideos";

type AiVoteProps = {
  videos: VideoView[];
  title: string;
  files: PreviewFile[];
};

export const AiVote = ({ videos, title, files }: AiVoteProps) => {
  const {
    targetUserRules,
    setTargetUserRules,
    generateVirtualUsers,
    virtualUsers,
    handleSelectVideos,
    selectedVideos,
  } = useAiVote(files, title);
  return (
    <>
      <p className="font-bold text-xl mt-10">AI投票(実装中🚧)</p>
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
