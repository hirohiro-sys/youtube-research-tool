import { SearchData } from "@/types/youtubeApiTypes";

const API_KEY = process.env.YOUTUBE_API_KEY;

// YouTube APIを呼び出してJSONレスポンスを返す汎用関数
const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
  return response.json();
};

// チャンネルの登録者数を取得
const getSubscriberCount = async (channelId: string) => {
  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`;
  const channelData = await fetchData(channelUrl);
  return parseInt(channelData.items[0].statistics.subscriberCount, 10);
};

// 動画の再生回数を取得
const getViewCount = async (videoId: string) => {
  const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`;
  const videoData = await fetchData(videoUrl);
  return parseInt(videoData.items[0].statistics.viewCount, 10);
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const keyword = url.searchParams.get('keyword') ?? '';
  const pageToken = url.searchParams.get('pageToken') ?? '';

  if (!keyword) return new Response(JSON.stringify({ error: 'キーワードが入力されていません' }), { status: 400 });
  

  try {
    // YouTubeの検索APIを使って動画を検索
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(keyword)}&type=video&maxResults=50&pageToken=${pageToken}&key=${API_KEY}`;
    const searchData: SearchData = await fetchData(searchUrl);

    // 検索結果のフィルタリング(promise.allを使うことで効率的に処理を行う)
    const filteredVideos = await Promise.all(
      searchData.items.map(async (item) => {
        const videoId = item.id.videoId;
        const channelId = item.snippet.channelId;

        // チャンネル情報と動画情報を取得
        const subscriberCount = await getSubscriberCount(channelId);
        const viewCount = await getViewCount(videoId);

        // 条件に合った動画をフィルタリング
        if (viewCount >= subscriberCount * 3) {
          return {
            title: item.snippet.title,
            videoId: videoId,
            channelId: channelId,
            viewCount: viewCount,
            subscriberCount: subscriberCount,
          };
        }

        return null;
      })
    );

    // フィルタリング後の動画情報を取得
    const validVideos = filteredVideos.filter(Boolean);

    // 次のページのトークンを取得
    const nextPageToken = searchData.nextPageToken || null;

    return new Response(
      JSON.stringify({ videos: validVideos, nextPageToken }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch YouTube data' }), { status: 500 });
  }
}
