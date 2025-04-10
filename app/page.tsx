"use client";

import { Video } from "@/types/youtubeApiTypes";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { useDownloadCSV } from "@/src/hooks/useDownloadCSV";
import { Download, Eye, Plus, Users } from "lucide-react";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const { downloadCSV } = useDownloadCSV();

  // 動画の初回取得をする関数
  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      const response = await fetch(`/api/research?keyword=${keyword}`);
      const data = await response.json();
      setVideos(data.videos);
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
    } finally {
      setLoading(false);
    }
  };

  // 動画の追加取得をする関数(ただこれだと以前取得したものがわからないから同じ動画を出してしまうことがある)
  const handleLoadMore = async () => {
    if (!nextPageToken) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/research?keyword=${keyword}&pageToken=${nextPageToken}`
      );
      const data = await response.json();
      setVideos((prevVideos) => [...prevVideos, ...data.videos]);
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-30 flex-grow">
      <motion.div
        className="flex justify-center mt-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 50 }}
      >
        <div className="card  border border-gray-300 shadow-sm p-6 flex flex-row gap-4 rounded-xl">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="キーワードを入力してください"
              className="input-lg w-70"
            />
          </label>
          <button
            onClick={handleSearch}
            disabled={!keyword}
            className="btn btn-neutral"
          >
            {loading ? (
              <span className="loading loading-ring loading-xl"></span>
            ) : (
              <p>検索</p>
            )}
          </button>
        </div>
      </motion.div>

      <div className="flex justify-between items-center px-20 mt-10">
        {videos && videos.length > 0 && (
          <>
            <p className="text-2xl font-bold">検索結果: {videos.length}件</p>
            <button
              onClick={() => downloadCSV(videos, keyword)}
              className="btn btn-outline btn-success"
            >
              <Download />
              CSVでダウンロード
            </button>
          </>
        )}
      </div>
      {!loading && videos?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          {hasSearched ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md"
            >
              <div className="p-6 inline-flex mb-4">
                <svg
                  className="h-12 w-12 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                検索結果が見つかりませんでした
              </h3>
              <p className="text-gray-500">別のキーワードをお試しください</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md"
            >
              <div className="p-6 inline-flex mb-4">
                <svg
                  className="h-12 w-12 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                動画を検索してみましょう
              </h3>
              <p className="text-gray-500">
                キーワードを入力して、需要のある動画を検索できます
              </p>
            </motion.div>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 px-20">
        {videos?.map((video) => (
          <div key={video.videoId} className="card bg-base-100 shadow-md">
            <figure>
              <Image
                src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full h-48 object-cover"
                width={480}
                height={270}
              />
            </figure>
            <div className="card-body p-6">
              <h2 className="card-title">
                <Link
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-600"
                >
                  {video.title}
                </Link>
              </h2>
              <div className="flex flex-col gap-3">
                <p className="flex items-center gap-4 font-mono">
                  <Eye />
                  {Number(video.viewCount).toLocaleString()} 回
                </p>
                <p className="flex items-center gap-4 font-mono">
                  <Users />
                  {Number(video.subscriberCount).toLocaleString()} 人
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center my-10">
        {loading ? (
          <span className="loading loading-dots loading-xl mt-20"></span>
        ) : (
          videos.length > 0 &&
          nextPageToken && (
            <button
              onClick={handleLoadMore}
              className="btn btn-outline rounded-2xl shadow-lg"
            >
              <Plus />
              もっと見る
            </button>
          )
        )}
      </div>
    </div>
  );
}
