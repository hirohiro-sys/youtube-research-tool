"use server";

import { fetchData } from "@/src/tools/demand-analysis/utils/fetchData";
import { parseDuration } from "@/src/tools/demand-analysis/utils/parseDuration";
import { fetchYoutubeSuggestions } from "@/src/tools/demand-analysis/utils/fetchSuggestions";
import { SearchData, Video } from "@/src/tools/demand-analysis/types/youtubeApiTypes";

export async function searchHighDemandVideos({
  keyword,
  scale,
  isShort,
  pageToken = "",
  publishedAfter = "",
}: {
  keyword: string;
  scale: string;
  isShort: boolean;
  pageToken?: string;
  publishedAfter?: string;
}) {
  const suggestions = await fetchYoutubeSuggestions(keyword);

  let validVideos: Video[] = [];
  let currentPageToken = pageToken;

  try {
    while (validVideos.length < 10) {
      let searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&maxResults=50&pageToken=${currentPageToken}`;
      if (publishedAfter) searchUrl += `&publishedAfter=${publishedAfter}`;

      const searchData: SearchData = await fetchData(searchUrl);
      const videoIds = searchData.items.map((item) => item.id.videoId).join(",");
      const channelIds = searchData.items.map((item) => item.snippet.channelId).join(",");
      if (!channelIds) break;

      const [videoData, channelData] = await Promise.all([
        fetchData(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}`
        ),
        fetchData(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelIds}`
        ),
      ]);

      const viewCountMap = new Map<string, number>();
      const durationMap = new Map<string, number>();
      const subscriberCountMap = new Map<string, number>();
      const likeCountMap = new Map<string, number>();

      videoData.items.forEach(
        (item: {
          id: string;
          statistics: { viewCount: string; likeCount: string };
          contentDetails: { duration: string };
        }) => {
          viewCountMap.set(item.id, parseInt(item.statistics.viewCount ?? "0", 10));
          likeCountMap.set(item.id, parseInt(item.statistics.likeCount ?? "0", 10));
          durationMap.set(item.id, parseDuration(item.contentDetails.duration));
        }
      );

      channelData.items.forEach(
        (item: { id: string; statistics: { subscriberCount: string } }) => {
          subscriberCountMap.set(item.id, parseInt(item.statistics.subscriberCount ?? "0", 10));
        }
      );

      const validVideosBatch = searchData.items.reduce<Video[]>((acc, item) => {
        const videoId = item.id.videoId;
        const channelId = item.snippet.channelId;
        const viewCount = viewCountMap.get(videoId) ?? 0;
        const likeCount = likeCountMap.get(videoId) ?? 0;
        const subscriberCount = subscriberCountMap.get(channelId) || 1;
        const duration = durationMap.get(videoId) ?? 0;

        if (
          viewCount >= subscriberCount * Number(scale) &&
          (isShort ? duration < 180 : duration >= 180) &&
          subscriberCount >= 100
        ) {
          if (!validVideos.some((video) => video.videoId === videoId)) {
            acc.push({
              title: item.snippet.title,
              videoId,
              channelId,
              viewCount,
              likeCount,
              subscriberCount,
              publishedAt: item.snippet.publishedAt,
            });
          }
        }
        return acc;
      }, []);

      validVideos = [...validVideos, ...validVideosBatch];
      currentPageToken = searchData.nextPageToken || "";
      if (!currentPageToken) break;
    }

    return {
      videos: validVideos,
      suggestions,
      nextPageToken: currentPageToken || null,
    };
  } catch (error) {
    console.error("データ取得エラー:", error);
    return {
      videos: [],
      nextPageToken: null,
      error: "データの取得に失敗しました",
    };
  }
}
