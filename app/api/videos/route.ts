import { fetchData } from "@/src/tools/demand-analysis/utils/fetchData";
import { formatDuration } from "@/src/tools/thumbnail-analysis/utils/formatDuration";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const channelId = url.searchParams.get("channelId");
  const keyword = url.searchParams.get("keyword");

  if (!channelId && !keyword) {
    return new Response(
      JSON.stringify({ error: "channelId または keyword が必要です" }),
      { status: 400 },
    );
  }

  try {
    let searchUrl = "";

    if (channelId) {
      searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=8&type=video`;
    } else if (keyword) {
      searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        keyword,
      )}&order=relevance&maxResults=19&type=video&videoDuration=medium`;
    }

    const searchData = await fetchData(searchUrl);

    const videoIds = searchData.items.map(
      (item: { id: { videoId: string } }) => item.id.videoId,
    );

    if (videoIds.length === 0) {
      return Response.json({ videos: [] });
    }

    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(",")}`;
    const detailsData = await fetchData(detailsUrl);

    const videos = detailsData.items.map(
      (item: {
        id: string;
        snippet: { title: string; channelTitle: string; publishedAt: string };
        contentDetails: { duration: string };
        statistics: { viewCount: string };
      }) => {
        const publishedDate = new Date(item.snippet.publishedAt);
        const daysAgo = Math.floor(
          (Date.now() - publishedDate.getTime()) / (1000 * 60 * 60 * 24),
        );

        return {
          videoId: item.id,
          title: item.snippet.title,
          channelName: item.snippet.channelTitle,
          duration: formatDuration(item.contentDetails.duration),
          viewCount: item.statistics.viewCount,
          daysAgo,
        };
      },
    );

    return Response.json({ videos });
  } catch (error) {
    console.error("データ取得エラー:", error);
    return new Response(
      JSON.stringify({ videos: [], error: "データの取得に失敗しました" }),
      { status: 500 },
    );
  }
}
