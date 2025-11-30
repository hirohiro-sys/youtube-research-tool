import { fetchData } from "@/src/tools/demand-analysis/utils/fetchData";
import { parseDuration } from "@/src/tools/demand-analysis/utils/parseDuration";
import { fetchYoutubeSuggestions } from "@/src/tools/demand-analysis/utils/fetchSuggestions";
import { SearchData } from "@/src/tools/demand-analysis/types/youtubeApiTypes";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword");
  const scale = Number(url.searchParams.get("scale"));
  const isShort = url.searchParams.get("timeOption") === "short";
  const pageToken = url.searchParams.get("pageToken") ?? "";
  const publishedAfter = url.searchParams.get("publishedAfter") ?? "";

  const suggestions = await fetchYoutubeSuggestions(keyword!);

  try {
    let validVideos: {
      title: string;
      videoId: string;
      channelId: string;
      viewCount: number;
      likeCount: number;
      subscriberCount: number;
    }[] = [];
    let currentPageToken = pageToken;

    while (validVideos.length < 10) {
      let searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&maxResults=50&pageToken=${currentPageToken}`;

      if (publishedAfter) searchUrl += `&publishedAfter=${publishedAfter}`;

      const searchData: SearchData = await fetchData(searchUrl);
      const videoIds = searchData.items
        .map((item) => item.id.videoId)
        .join(",");
      const channelIds = searchData.items
        .map((item) => item.snippet.channelId)
        .join(",");
      // channelIdsが空でエラーになることがあるため
      if (!channelIds) break;

      const [videoData, channelData] = await Promise.all([
        fetchData(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}`,
        ),
        fetchData(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelIds}`,
        ),
      ]);

      // idに紐づくデータをO(1)で取得するためにMapを使用
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
          viewCountMap.set(
            item.id,
            parseInt(item.statistics.viewCount ?? "0", 10),
          );
          likeCountMap.set(
            item.id,
            parseInt(item.statistics.likeCount ?? "0", 10),
          );
          durationMap.set(item.id, parseDuration(item.contentDetails.duration));
        },
      );
      channelData.items.forEach(
        (item: { id: string; statistics: { subscriberCount: string } }) => {
          subscriberCountMap.set(
            item.id,
            parseInt(item.statistics.subscriberCount ?? "0", 10),
          );
        },
      );

      const validVideosBatch = searchData.items.reduce<
        {
          title: string;
          videoId: string;
          channelId: string;
          viewCount: number;
          likeCount: number;
          subscriberCount: number;
          publishedAt: string;
        }[]
      >((acc, item) => {
        const videoId = item.id.videoId;
        const channelId = item.snippet.channelId;
        const viewCount = viewCountMap.get(videoId) ?? 0;
        const likeCount = likeCountMap.get(videoId) ?? 0;
        const subscriberCount = subscriberCountMap.get(channelId) || 1;
        const duration = durationMap.get(videoId) ?? 0;
        if (
          viewCount >= subscriberCount * scale &&
          (isShort ? duration < 180 : duration >= 180) &&
          subscriberCount >= 100
        ) {
          // 現状もっと見るでしか重複削除できてなかったので、ここでも重複削除
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

    return new Response(
      JSON.stringify({
        videos: validVideos,
        suggestions,
        nextPageToken: currentPageToken || null,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("データ取得エラー:", error);
    return new Response(
      JSON.stringify({
        videos: [],
        nextPageToken: null,
        error: "データの取得に失敗しました",
      }),
      { status: 500 },
    );
  }
}

  // リクエスト側の実装
  // const handleSearch = async (suggestKeyword?: string) => {
  //   setLoading(true);
  //   setHasSearched(true);
  //   try {
  //     const publishedAfter = getPublishedAfter(range);
  //     const query = new URLSearchParams({
  //       keyword: suggestKeyword ?? keyword,
  //       scale,
  //       timeOption,
  //       ...(publishedAfter && { publishedAfter }),
  //     });
  //     const response = await fetch(`/api/research?${query.toString()}`);
  //     const data = await response.json();
  //     setVideos(data.videos);
  //     setNextPageToken(data.nextPageToken);
  //     setSuggestions(data.suggestions);
  //   } catch (error) {
  //     console.error("データの取得に失敗しました:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleLoadMore = async () => {
  //   if (!nextPageToken) return;
  //   setLoading(true);
  //   try {
  //     const publishedAfter = getPublishedAfter(range);
  //     const query = new URLSearchParams({
  //       keyword,
  //       scale,
  //       timeOption,
  //       pageToken: nextPageToken,
  //       ...(publishedAfter && { publishedAfter }),
  //     });
  //     const response = await fetch(`/api/research?${query.toString()}`);
  //     const data = await response.json();
  //     setVideos((prev) => {
  //       const existingIds = new Set(prev.map((v) => v.videoId));
  //       const uniqueNewVideos = data.videos.filter(
  //         (video: Video) => !existingIds.has(video.videoId),
  //       );
  //       return [...prev, ...uniqueNewVideos];
  //     });
  //     setNextPageToken(data.nextPageToken);
  //     setSuggestions(data.suggestions);
  //   } catch (error) {
  //     console.error("データの取得に失敗しました:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };