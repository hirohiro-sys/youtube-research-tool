// カンマ区切りで1つの変数に入れた方がいい？
const API_KEYS = [
    process.env.YOUTUBE_API_KEY,
    process.env.YOUTUBE_API_KEY2,
    process.env.YOUTUBE_API_KEY3,
    process.env.YOUTUBE_API_KEY4,
    process.env.YOUTUBE_API_KEY5,
    process.env.YOUTUBE_API_KEY6,
]

let currentAPIKeyIndex = 0;
export const fetchData = async (url: string) => {
    let retries = 0;
    const maxRetries = API_KEYS.length;
    while (retries < maxRetries) {
      const apiKey = API_KEYS[currentAPIKeyIndex];
      const finalUrl = url + `&key=${apiKey}`;
      const response = await fetch(finalUrl);
      if (!response.ok) {
        if (response.status === 403) {
          const errorData = await response.json();
          if (errorData.error.errors[0].reason === 'quotaExceeded') {
            // APIキーのインデックス調整
            currentAPIKeyIndex = (currentAPIKeyIndex + 1) % API_KEYS.length;
            console.log(`APIキーを切り替えました。新しいキーインデックス: ${currentAPIKeyIndex}`);
            retries++;
            continue;
          }
        }
        throw new Error(`データ取得エラー: ${url}`);
      }
      return response.json();
    }
    throw new Error('全てのAPIキーで1日の利用制限に達しました。');
};

// デフォルトではISO8601形式の文字列になっているので秒数に変換する関数
export const parseDuration = (duration: string): number => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const [, hours, minutes, seconds] = match.map(v => parseInt(v ?? "0", 10));
  return (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
};