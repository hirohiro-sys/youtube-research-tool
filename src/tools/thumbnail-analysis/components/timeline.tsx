import Image from "next/image";
import type { VideoView } from "../hooks/useVideoSearch";
import { formatDaysAgo } from "../utils/formatDayAgo";

type TimeLineProps = {
  previewMode: "pc" | "sp";
  videos: VideoView[];
  title: string;
};

export const TimeLine = ({ previewMode, videos, title }: TimeLineProps) => {
  return (
    <>
      <div className="mb-4">
        {videos.length > 0 && (
          <div
            className={
              previewMode === "pc"
                ? "grid grid-cols-3 gap-4 mt-4"
                : "flex flex-col gap-3 mt-4"
            }
          >
            {videos.map((video) => (
              <div
                key={video.videoId}
                className={
                  previewMode === "pc"
                    ? "bg-white rounded-lg shadow-md overflow-hidden"
                    : "flex gap-3 bg-white rounded-lg shadow-md p-3"
                }
              >
                {previewMode === "pc" ? (
                  <>
                    <div className="relative">
                      <Image
                        src={
                          video.thumbnail ??
                          `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
                        }
                        alt={video.title}
                        className="object-cover"
                        width={320}
                        height={180}
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <a
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 leading-tight hover:underline hover:text-blue-600"
                      >
                        {video.videoId === "demo-video" ? title : video.title}
                      </a>
                      <div className="text-xs text-gray-600">
                        <div className="mb-1">{video.channelName}</div>
                        <div>
                          {video.viewCount}回視聴•{formatDaysAgo(video.daysAgo)}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative flex-shrink-0">
                      <Image
                        src={
                          video.thumbnail ??
                          `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
                        }
                        alt={video.title}
                        className="w-40 h-24 object-cover rounded"
                        width={160}
                        height={90}
                      />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1">
                      <a
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 leading-tight hover:underline hover:text-blue-600"
                      >
                        {video.videoId === "demo-video" ? title : video.title}
                      </a>
                      <div className="text-xs text-gray-600">
                        <div className="mb-1">{video.channelName}</div>
                        <div>
                          {video.viewCount}回視聴•{formatDaysAgo(video.daysAgo)}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
