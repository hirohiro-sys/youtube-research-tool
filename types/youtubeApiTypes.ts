// YouTube APIから取得する検索結果のアイテム型
export interface SearchResultItem {
    kind: string;
    etag: string;
    id: {
      kind: string;
      videoId: string;
    };
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: {
          url: string;
        };
      };
      channelTitle: string;
      liveBroadcastContent: string;
    };
  }
  
  // YouTube APIの検索結果全体の型
export interface SearchData {
    kind: string;
    etag: string;
    nextPageToken: string | null;
    regionCode: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    items: SearchResultItem[];
  }
  
// 動画の型情報
export interface Video {
    videoId: string;
    title: string;
    viewCount: number;
    likeCount: number
    subscriberCount: number;
    publishedAt: string;
  }