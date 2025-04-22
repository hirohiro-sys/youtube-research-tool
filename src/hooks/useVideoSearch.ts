import { useMemo, useState } from "react";
import { Video } from "@/types/youtubeApiTypes";

export const useVideoSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState<"newest" | "popular" | "viewCount" | "likeCount">("newest");

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

  const sortedVideos = useMemo(() => {
    if (sortType === "newest") {
      return [...videos].sort(
        // bの方が新しい場合(引き算の結果が正になる場合)は前に来るようにする
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }
    if (sortType === "popular") {
      return [...videos].sort((a, b) => {
        const aRate = (a.viewCount ?? 0) / (a.subscriberCount ?? 1);
        const bRate = (b.viewCount ?? 0) / (b.subscriberCount ?? 1);
        return bRate - aRate;
      });
    }
    if (sortType === "viewCount") {
      return [...videos].sort((a, b) => {
        return (b.viewCount ?? 0) - (a.viewCount ?? 0);
      });
    }
    if (sortType === "likeCount") {
      return [...videos].sort((a, b) => {
        return (b.likeCount ?? 0) - (a.likeCount ?? 0);
      });
    }
    return videos;
  }, [videos, sortType]);
  
  
  return {
    keyword,
    setKeyword,
    setSortType,
    videos: sortedVideos,
    loading,
    hasSearched,
    hasNextPage: !!nextPageToken,
    handleSearch,
    handleLoadMore,
  };
};
