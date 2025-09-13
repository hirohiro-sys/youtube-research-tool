import { Play } from "lucide-react";
import { formatDaysAgo } from "../utils/formatDayAgo";
import Image from "next/image";
import { PreviewFile } from "../types/fileTypes";
import { VideoView } from "../hooks/useVideoSearch";

type ChannelVideosProps = {
  channelId: string;
  setChannelId: (channelId: string) => void;
  channelVideos: VideoView[];
  handleSearchchannelVideos: () => void;
  files: PreviewFile[];
  title: string;
};

export const ChannelVideos = ({
  channelId,
  setChannelId,
  channelVideos,
  handleSearchchannelVideos,
  files,
  title,
}: ChannelVideosProps) => {
  return (
    <>
      <div>
        <p className="font-bold text-xl mt-10">チャンネルプレビュー</p>
        <p className="mb-2 text-gray-500">
          チャンネルIDは、YouTubeチャンネルのURLから取得できます（例:youtube.com/channel/UCxxxxxxx）
        </p>
        <input
          type="text"
          className="input"
          placeholder="チャンネルIDを入力"
          value={channelId}
          onChange={(e) => setChannelId(e.target.value)}
        />
        <button
          className="btn"
          onClick={() => handleSearchchannelVideos()}
          disabled={!channelId}
        >
          取得
        </button>
      </div>
      {channelVideos?.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-4 text-gray-900">
            チャンネル動画一覧 ({channelVideos.length}件)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="relative aspect-video bg-gray-200">
                <Image
                  src={files[0].preview || "/placeholder.svg"}
                  fill
                  className="object-cover"
                  alt="アップロードされた画像"
                />

                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  5:30
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 leading-tight">
                  {title || "タイトル未設定"}
                </h4>

                <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                  <span>100回視聴・ 1日前</span>
                </div>
              </div>
            </div>
            {channelVideos.map((video) => (
              <div
                key={video.videoId}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="relative aspect-video bg-gray-200">
                  <Image
                    src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                <div className="p-4">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 leading-tight hover:underline hover:text-blue-600"
                  >
                    {video.title}
                  </a>

                  <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                    <span>
                      {Number(video.viewCount).toLocaleString()}回視聴・
                      {formatDaysAgo(video.daysAgo)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {channelVideos.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <Play className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-600">動画が見つかりませんでした</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
