import { SearchData } from "@/types/youtubeApiTypes";

const API_KEY = process.env.YOUTUBE_API_KEY;
const previouslyFetchedVideoIds: Set<string> = new Set();

// チャンネルや動画のURLから情報を取得する関数
const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`データ取得エラー: ${url}`);
  return response.json();
};

// チャンネルの登録者数を取得する関数
const getSubscriberCount = async (channelId: string) => {
  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`;
  const channelData = await fetchData(channelUrl);
  return parseInt(channelData.items[0].statistics.subscriberCount, 10);
};

// 動画の再生回数を取得する関数
const getViewCount = async (videoId: string) => {
  const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`;
  const videoData = await fetchData(videoUrl);
  return parseInt(videoData.items[0].statistics.viewCount, 10);
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const keyword = url.searchParams.get('keyword') ?? '';
  const pageToken = url.searchParams.get('pageToken') ?? '';

  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&maxResults=10&pageToken=${pageToken}&key=${API_KEY}`;
    const searchData: SearchData = await fetchData(searchUrl);

    const filteredVideos = await Promise.all(
      searchData.items.map(async (item) => {
        const videoId = item.id.videoId;
        // すでに取得済みの動画IDをスキップ
        if (previouslyFetchedVideoIds.has(videoId)) return null;
        const channelId = item.snippet.channelId;
        // チャンネル登録者数と動画の再生回数を取得
        const subscriberCount = await getSubscriberCount(channelId);
        const viewCount = await getViewCount(videoId);
        // チャンネル登録者数 ✖️ 3倍以上の再生数でフィルタリング
        if (viewCount >= subscriberCount * 3) {
          // 取得した動画IDを記録
          previouslyFetchedVideoIds.add(videoId);

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
    console.error('データ取得エラー:', error);
    return new Response(JSON.stringify({ error: 'データの取得に失敗しました' }), { status: 500 });
  }
}
