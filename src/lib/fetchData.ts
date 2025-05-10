// カンマ区切りで1つの変数に入れるか検討
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