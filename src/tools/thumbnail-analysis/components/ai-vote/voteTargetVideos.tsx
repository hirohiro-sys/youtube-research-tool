import Image from "next/image";
import { VideoView } from "../../hooks/useVideoSearch";
import { selectedVideo } from "../../types/aiVote";

type VoteTargetVideosProps = {
  videos: VideoView[];
  title: string;
  handleSelectVideos: (video: VideoView) => void;
  selectedVideos: selectedVideo[];
};

export const VoteTargetVideos = ({
  videos,
  title,
  handleSelectVideos,
  selectedVideos,
}: VoteTargetVideosProps) => {
  return (
    <>
      <div className="grid grid-cols-5 gap-2">
        {videos.map((video, index) => {
          const isSelected = selectedVideos.some(
            (v) => v.videoId === video.videoId,
          );
          const isDisabled = video.videoId === "demo-video";
          return (
            <div
              key={video.videoId}
              className={`p-2 ${
                video.videoId === "demo-video"
                  ? "outline-2 outline-green-500 rounded-lg"
                  : isSelected
                    ? "outline-2 outline-red-500 rounded-lg"
                    : ""
              }`}
              onClick={
                !isDisabled ? () => handleSelectVideos(video) : undefined
              }
            >
              <Image
                src={
                  (index === 0
                    ? videos[0].thumbnail
                    : `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`) ??
                  "サムネイルの取得に失敗しました。"
                }
                width={320}
                height={180}
                alt={video.title || "動画サムネイル"}
              />
              <p className="text-xs">
                {(video.videoId === "demo-video" ? title : video.title) ||
                  "タイトルを入力"}
              </p>
            </div>
          );
        })}
      </div>

      {selectedVideos.length > 1 && (
        <div className="mt-8 pt-8 border-t border-gray-300">
          <h2 className="text-lg font-bold mb-4">選択中のビデオ</h2>
          <div className="grid grid-cols-5 gap-2">
            {videos
              .filter((video) =>
                selectedVideos.some((sv) => sv.videoId === video.videoId),
              )
              .map((video) => {
                const selected = selectedVideos.find(
                  (sv) => sv.videoId === video.videoId,
                );
                const voteCount = selected?.voteCount ?? 0;
                return (
                  <div
                    key={`selected-${video.videoId}`}
                    className="relative p-2 outline-2 outline-red-500 rounded-lg"
                  >
                    <div className="absolute top-0 right-0 bg-red-600 bg-opacity-75 text-white text-xs font-bold rounded-full px-2 py-1 z-10">
                      {voteCount}票
                    </div>
                    <Image
                      src={
                        (video.videoId === "demo-video"
                          ? videos[0].thumbnail
                          : `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`) ??
                        "サムネイルの取得に失敗しました。"
                      }
                      width={320}
                      height={180}
                      alt={video.title || "動画サムネイル"}
                    />
                    <p className="text-xs">
                      {(video.videoId === "demo-video" ? title : video.title) ||
                        "タイトルを入力"}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};
