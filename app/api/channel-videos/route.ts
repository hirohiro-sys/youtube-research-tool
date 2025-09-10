import { fetchData } from "@/src/tools/demand-analysis/utils/fetchData";

function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) return "0:00";

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  const paddedMinutes = hours > 0 ? String(minutes).padStart(2, "0") : String(minutes);
  const paddedSeconds = String(seconds).padStart(2, "0");

  return hours > 0
    ? `${hours}:${paddedMinutes}:${paddedSeconds}`
    : `${minutes}:${paddedSeconds}`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const channelId = url.searchParams.get("channelId");

  if (!channelId) {
    return new Response(
      JSON.stringify({ error: "channelIdが必要です" }),
      { status: 400 }
    );
  }

  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=8&type=video`;
    const searchData = await fetchData(searchUrl);

    const videoIds = searchData.items.map(
      (item: { id: { videoId: string } }) => item.id.videoId
    );

    if (videoIds.length === 0) {
      return Response.json({ videos: [] });
    }

    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(",")}`;
    const detailsData = await fetchData(detailsUrl);

    const videos = detailsData.items.map(
      (item: {
        id: string;
        snippet: { title: string; publishedAt: string };
        contentDetails: { duration: string };
        statistics: { viewCount: string };
      }) => {
        const publishedDate = new Date(item.snippet.publishedAt);
        const daysAgo = Math.floor(
          (Date.now() - publishedDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        return {
          videoId: item.id,
          title: item.snippet.title,
          duration: formatDuration(item.contentDetails.duration),
          viewCount: item.statistics.viewCount,
          daysAgo,
        };
      }
    );

    return Response.json({ videos });
  } catch (error) {
    console.error("データ取得エラー:", error);
    return new Response(
      JSON.stringify({ videos: [], error: "データの取得に失敗しました" }),
      { status: 500 }
    );
  }
}
