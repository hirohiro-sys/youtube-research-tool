import { Video } from "@/src/types/youtubeApiTypes";

import Papa from 'papaparse';

export const useDownloadCSV = () => {
  const downloadCSV = (videos: Video[], keyword: string) => {
    const header = ["タイトル", "URL","いいね数","再生回数", "登録者数","倍率"];
    const rows = videos.map((video) => [
      video.title,
      `https://www.youtube.com/watch?v=${video.videoId}`,
      video.likeCount,
      video.viewCount,
      video.subscriberCount,
      Number(video.subscriberCount) > 0
        ? `${(
            Number(video.viewCount) / Number(video.subscriberCount)
          ).toFixed(1)} 倍`
        : "倍率なし",
    ]);

    const csvContent = Papa.unparse({
      fields: header,
      data: rows
    });

    const BOM = "\uFEFF";
    const csvWithBOM = BOM + csvContent;

    const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `youtube_videos_${keyword}.csv`);
    link.click();
  };

  return { downloadCSV };
};
