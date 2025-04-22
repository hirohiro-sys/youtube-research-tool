import { SearchData } from "@/types/youtubeApiTypes";

const API_KEY = process.env.YOUTUBE_API_KEY;

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`データ取得エラー: ${url}`);
  return response.json();
};

// デフォルトではISO8601形式の文字列になっているので秒数に変換する関数
const parseDuration = (duration: string): number => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const [, hours, minutes, seconds] = match.map(v => parseInt(v ?? "0", 10));
  return (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const keyword = url.searchParams.get('keyword');
  const pageToken = url.searchParams.get('pageToken') ?? '';

  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&maxResults=50&pageToken=${pageToken}&key=${API_KEY}`;
    const searchData: SearchData = await fetchData(searchUrl);

    const videoIds = searchData.items.map(item => item.id.videoId).join(',');
    const channelIds = searchData.items.map(item => item.snippet.channelId).join(',');
    const [videoData, channelData] = await Promise.all([
      fetchData(`https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`),
      fetchData(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelIds}&key=${API_KEY}`)
    ]);

    // idに紐ずくデータをO(1)で取得するためにMapを使用
    const viewCountMap = new Map<string, number>();
    const durationMap = new Map<string, number>();
    const subscriberCountMap = new Map<string, number>();
    videoData.items.forEach((item: { id: string, statistics: { viewCount: string }, contentDetails: { duration: string } }) => {
      viewCountMap.set(item.id, parseInt(item.statistics.viewCount ?? "0", 10));
      durationMap.set(item.id, parseDuration(item.contentDetails.duration));
    });
    channelData.items.forEach((item: { id: string, statistics: { subscriberCount: string } }) => {
      subscriberCountMap.set(item.id, parseInt(item.statistics.subscriberCount ?? "0", 10));
    });

    const validVideos = searchData.items.reduce<{ 
      title: string; 
      videoId: string; 
      channelId: string; 
      viewCount: number; 
      subscriberCount: number; 
    }[]>((acc, item) => {
      const videoId = item.id.videoId;
      const channelId = item.snippet.channelId;
      const viewCount = viewCountMap.get(videoId) ?? 0;
      const subscriberCount = subscriberCountMap.get(channelId) ?? 1;
      const duration = durationMap.get(videoId) ?? 0;
    
      // ショート(3分未満)動画は需要がないみたいなので除外
      if (viewCount >= subscriberCount * 3 && duration >= 180) {
        acc.push({
          title: item.snippet.title,
          videoId,
          channelId,
          viewCount,
          subscriberCount,
        });
      }
      return acc;
    }, []);

    return new Response(
      JSON.stringify({
        videos: validVideos,
        nextPageToken: searchData.nextPageToken || null,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("データ取得エラー:", error);
    return new Response(JSON.stringify({ error: "データの取得に失敗しました" }), { status: 500 });
  }
}
