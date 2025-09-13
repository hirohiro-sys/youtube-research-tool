import Image from "next/image";
import type { VideoView } from "../hooks/useVideoSearch";
import { formatDaysAgo } from "../utils/formatDayAgo";
import { PreviewFile } from "../types/fileTypes";

type TimeLineProps = {
  previewMode: "pc" | "sp";
  keyword: string;
  setKeyword: (keyword: string) => void;
  handleSearchchannelVideos: () => void;
  videos: VideoView[];
  files: PreviewFile[];
  title: string;
};

export const TimeLine = ({
  previewMode,
  keyword,
  setKeyword,
  handleSearchchannelVideos,
  videos,
  files,
  title,
}: TimeLineProps) => {
  return (
    <>
      <div>
        <p className="font-bold text-xl mt-10">キーワード検索</p>
        <p className="mb-2 text-gray-500">
          キーワードを入力すると、タイムラインプレビューを確認できます
        </p>
        <input
          type="text"
          className="input"
          placeholder="キーワードを入力"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="btn"
          onClick={() => handleSearchchannelVideos()}
          disabled={!keyword}
        >
          検索
        </button>

        {/* タイムラインなので自分がシャッフル表示できるようにしたいかも */}
        {videos.length > 0 && (
          <div
            className={
              previewMode === "pc"
                ? "grid grid-cols-3 gap-4 mt-4"
                : "flex flex-col gap-3 mt-4"
            }
          >
            {files.length > 0 && (
              <div
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
                        src={files[0].preview}
                        alt={title}
                        className="object-cover"
                        width={320}
                        height={180}
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                        5:30
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm line-clamp-2 mb-2">
                        {title}
                      </h3>
                      <div className="text-xs text-gray-600">
                        <div className="mb-1">あなたのチャンネル名</div>
                        <div>100回視聴•1日前</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative flex-shrink-0">
                      <Image
                        src={files[0].preview}
                        alt={title}
                        className="w-40 h-24 object-cover rounded"
                        width={160}
                        height={90}
                      />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
                        5:30
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm line-clamp-2 mb-1">
                        {title}
                      </h3>
                      <div className="text-xs text-gray-600">
                        <div className="mb-1">あなたのチャンネル名</div>
                        <div>100回視聴•1日前</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

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
                        src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
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
                        {video.title}
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
                        src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
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
                        {video.title}
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
