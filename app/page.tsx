"use client";

import { useState } from "react";

interface Video {
  videoId: string;
  title: string;
  viewCount: number;
  subscriberCount: number;
}

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  // 動画の初回取得をする関数
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/research?keyword=${encodeURIComponent(keyword)}`
      );
      const data = await response.json();
      setVideos(data.videos);
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
    } finally {
      setLoading(false);
    }
  };

  // 動画の追加取得をする関数
  const handleLoadMore = async () => {
    if (!nextPageToken) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/research?keyword=${encodeURIComponent(
          keyword
        )}&pageToken=${nextPageToken}`
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
    <div>
      <h1>YouTube動画検索</h1>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="検索キーワード"
      />
      <button
        onClick={handleSearch}
        disabled={!keyword}
      >
        {loading ? "検索中..." : "検索"}
      </button>

      <div>
        {videos.length > 0 ? (
          <ul>
            {videos.map((video) => (
              <li key={video.videoId}>
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {video.title}
                </a>
                <p>再生回数: {video.viewCount}</p>
                <p>登録者数: {video.subscriberCount}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>該当する動画はありません。</p>
        )}
      </div>

      {nextPageToken && !loading && (
        <button onClick={handleLoadMore}>
          {loading ? "読み込み中..." : "もっと見る"}
        </button>
      )}
    </div>
  );
}
