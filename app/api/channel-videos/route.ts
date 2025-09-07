import { fetchData } from "@/src/tools/demand-analysis/utils/fetchData";

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
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=10&type=video`;
    const searchData = await fetchData(searchUrl);

    const videos = searchData.items.map((item: { id: { videoId: string; }; snippet: { title: string; }; }) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
    }));

    return Response.json({ videos });
  } catch (error) {
    console.error("データ取得エラー:", error);
    return new Response(
      JSON.stringify({ videos: [], error: "データの取得に失敗しました" }),
      { status: 500 }
    );
  }
}
