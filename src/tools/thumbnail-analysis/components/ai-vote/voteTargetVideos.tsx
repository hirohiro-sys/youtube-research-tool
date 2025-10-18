import Image from "next/image";
import { VideoView } from "../../hooks/useVideoSearch";

type VoteTargetVideosProps = {
  videos: VideoView[];
  title: string;
  handleSelectVideos: (video: VideoView) => void;
  selectedVideos: { videoId: string; title: string }[];
};

export const VoteTargetVideos = ({
  videos,
  title,
  handleSelectVideos,
  selectedVideos,
}: VoteTargetVideosProps) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {videos.map((video, index) => {
        const isSelected = selectedVideos.some(
          (v) => v.videoId === video.videoId
        );
        const isDisabled = index === 0;
        return (
          <div
            key={video.videoId}
            className={`p-2 ${
              index === 0 ? "outline-2 outline-green-500 rounded-lg" : ""
            } ${isSelected ? "outline-2 outline-red-500 rounded-lg" : ""}`}
            onClick={!isDisabled ? () => handleSelectVideos(video) : undefined}
          >
            <Image
              src={
                (index === 0
                  ? videos[0].thumbnail
                  : `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`) ??
                "サムネイルの取得に失敗しました。"
              }
              width={320}
              height={180}
              alt={videos[0].title || "動画サムネイル"}
            />
            <p className="text-xs">
              {(index === 0 ? title : video.title) || "タイトルを入力"}
            </p>
          </div>
        );
      })}
    </div>
  );
};
