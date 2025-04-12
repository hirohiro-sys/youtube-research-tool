import { Video } from "@/types/youtubeApiTypes";

export const useDownloadCSV = () => {
  const downloadCSV = (videos: Video[], keyword: string) => {
    const header = ["タイトル", "URL","再生回数", "登録者数"];
    const rows = videos.map((video) => [
      video.title,
      `https://www.youtube.com/watch?v=${video.videoId}`,
      video.viewCount,
      video.subscriberCount,
    ]);

    const csvContent = [
      header.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const BOM = "\uFEFF";
    const csvWithBOM = BOM + csvContent;

    const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `youtube_videos_${keyword}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { downloadCSV };
};
