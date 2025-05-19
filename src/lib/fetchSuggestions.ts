export async function fetchYoutubeSuggestions(keyword: string) {
  try {
    const response = await fetch(
      `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${keyword}`,
    );
    const suggestData = await response.text();

    // JSONP形式のレスポンスからJSON部分を抽出
    const match = suggestData.match(/^[^\(]+\((.*)\)$/);
    if (!match || !match[1]) {
      console.warn("サジェストのパースに失敗しました:", suggestData);
      return [];
    }

    const suggestJson = JSON.parse(match[1]);
    // suggestJson[1] は [["候補1", 0, [...]], ["候補2", 0, [...]], ...] の形式なので候補文字列だけ取り出す
    let suggestions = suggestJson[1].map((item: string) => item[0]);
    suggestions = suggestions.filter((word: string) => word !== keyword);
    return suggestions;
  } catch (error) {
    console.error("サジェスト取得エラー:", error);
    return [];
  }
}
