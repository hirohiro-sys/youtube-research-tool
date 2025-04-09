"use client";

import { Video } from "@/types/youtubeApiTypes";
import { Rocket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  // 動画の初回取得をする関数
  const handleSearch = async () => {
    setLoading(true);
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

  // CSVファイルをダウンロードする関数
  const downloadCSV = () => {
    // CSVのヘッダー
    const header = ["タイトル", "再生回数", "登録者数"];
    // 動画情報をCSV形式に整形
    const rows = videos.map((video) => [
      video.title,
      video.viewCount,
      video.subscriberCount,
    ]);

    // CSV文字列を作成
    const csvContent = [
      header.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // UTF-8 BOMを付与
    const BOM = "\uFEFF";
    const csvWithBOM = BOM + csvContent;

    // Blobを作成
    const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    // ダウンロードリンクを作成
    link.setAttribute("href", url);
    link.setAttribute("download", `youtube_videos_${keyword}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="m-auto">
      <h1>YouTube動画検索</h1>
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
          className="input-lg"
        />
      </label>
      <button onClick={handleSearch} disabled={!keyword} className="btn">
        {loading ? (
          <span className="loading loading-ring loading-xl"></span>
        ) : (
          <>
            <Rocket />
            <p>探索開始</p>
          </>
        )}
      </button>

      <div>
        {videos && videos.length > 0 ? (
          <ul>
            {videos.map((video) => (
              <li key={video.videoId}>
                <Link
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {video.title}
                </Link>
                <p>再生回数: {video.viewCount}</p>
                <p>登録者数: {video.subscriberCount}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>該当する動画が見つかりませんでした。</p>
        )}
      </div>

      {nextPageToken && !loading && (
        <button onClick={handleLoadMore} className="btn">
          もっと見る
        </button>
      )}

      {videos.length > 0 && (
        <button onClick={downloadCSV} className="btn btn-link">
          CSVでダウンロード
        </button>
      )}
    </div>
  );
}
