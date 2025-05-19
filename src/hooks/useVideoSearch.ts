import { useMemo, useState } from "react";
import { Range, Video } from "@/src/types/youtubeApiTypes";

export const useVideoSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState<
    "newest" | "popular" | "viewCount" | "likeCount" | ""
  >("");
  const [range, setRange] = useState<Range>("all");
  const [scale, setScale] = useState("3");
  const [timeOption, setTimeOption] = useState("default");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // RangeをISO文字列に変換するユーティリティ関数
  const getPublishedAfter = (range: Range): string | undefined => {
    const now = new Date();
    switch (range) {
      case "6months":
        now.setMonth(now.getMonth() - 6);
        break;
      case "3months":
        now.setMonth(now.getMonth() - 3);
        break;
      case "1month":
        now.setMonth(now.getMonth() - 1);
        break;
      case "1week":
        now.setDate(now.getDate() - 7);
        break;
      default:
        return undefined;
    }
    return now.toISOString();
  };

  const handleSearch = async (suggestKeyword?: string) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const publishedAfter = getPublishedAfter(range);
      const query = new URLSearchParams({
        keyword: suggestKeyword ?? keyword,
        scale,
        timeOption,
        ...(publishedAfter && { publishedAfter }),
      });
      const response = await fetch(`/api/research?${query.toString()}`);
      const data = await response.json();
      setVideos(data.videos);
      setNextPageToken(data.nextPageToken);
      setSuggestions(data.suggestions);
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
      const publishedAfter = getPublishedAfter(range);
      const query = new URLSearchParams({
        keyword,
        scale,
        timeOption,
        pageToken: nextPageToken,
        ...(publishedAfter && { publishedAfter }),
      });
      const response = await fetch(`/api/research?${query.toString()}`);
      const data = await response.json();
      setVideos((prev) => {
        const existingIds = new Set(prev.map((v) => v.videoId));
        const uniqueNewVideos = data.videos.filter(
          (video: Video) => !existingIds.has(video.videoId),
        );
        return [...prev, ...uniqueNewVideos];
      });
      setNextPageToken(data.nextPageToken);
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortedVideos = useMemo(() => {
    if (sortType === "newest") {
      return [...videos].sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
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
      return [...videos].sort(
        (a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0),
      );
    }
    if (sortType === "likeCount") {
      return [...videos].sort(
        (a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0),
      );
    }
    return videos;
  }, [videos, sortType]);

  return {
    keyword,
    setKeyword,
    setSortType,
    range,
    setRange,
    scale,
    setScale,
    timeOption,
    setTimeOption,
    videos: sortedVideos,
    loading,
    hasSearched,
    hasNextPage: !!nextPageToken,
    handleSearch,
    handleLoadMore,
    suggestions,
  };
};
