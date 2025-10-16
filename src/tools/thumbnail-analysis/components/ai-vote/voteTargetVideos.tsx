import Image from "next/image";
import { VideoView } from "../../hooks/useVideoSearch";

type VoteTargetVideosProps = {
  videos: VideoView[];
  title: string;
};

// あくまでタイトルとサムネイル画像の投票をするので、ここはそこまでYoutubeライクなUIにしなくていい
export const VoteTargetVideos = ({ videos, title }: VoteTargetVideosProps) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {videos.map((video, index) => {
        return (
          <div
            key={video.videoId}
            className={`p-2 ${
              index === 0 ? "border-2 border-green-500 rounded-lg" : ""
            }`}
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
