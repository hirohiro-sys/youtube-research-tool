export function formatDuration(isoDuration: string): string {
  // 投稿待機中の動画はdurationが空になるため適当に返す
  if (!isoDuration) return "0:00";

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";

  const hours = Number(match[1] || "0");
  const minutes = Number(match[2] || "0");
  const seconds = Number(match[3] || "0");

  const paddedMinutes =
    hours > 0 ? String(minutes).padStart(2, "0") : String(minutes);
  const paddedSeconds = String(seconds).padStart(2, "0");

  return hours > 0
    ? `${hours}:${paddedMinutes}:${paddedSeconds}`
    : `${minutes}:${paddedSeconds}`;
}
