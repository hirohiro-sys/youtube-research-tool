import { useState } from "react";
import { Video } from "@/types/youtubeApiTypes";

export const useVideoSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleLoadMore = async () => {
    if (!nextPageToken) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/research?keyword=${keyword}&pageToken=${nextPageToken}`
      );
      const data = await response.json();
  
      setVideos((prev) => {
        // 「もっと見る」で追加取得した際に動画が重複しないようにする
        const existingIds = new Set(prev.map((v) => v.videoId));
        const uniqueNewVideos = data.videos.filter(
          (video: Video) => !existingIds.has(video.videoId)
        );
        return [...prev, ...uniqueNewVideos];
      });
  
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return {
    keyword,
    setKeyword,
    videos,
    loading,
    hasSearched,
    hasNextPage: !!nextPageToken,
    handleSearch,
    handleLoadMore,
  };
};
