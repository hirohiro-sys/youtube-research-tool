// デフォルトではISO8601形式の文字列になっているので秒数に変換する関数
export const parseDuration = (duration: string): number => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    const [, hours, minutes, seconds] = match.map(v => parseInt(v ?? "0", 10));
    return (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
  };