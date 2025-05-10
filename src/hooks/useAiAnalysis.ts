import { Video } from "@/src/types/youtubeApiTypes";
import { useState } from "react";

export const useAiAnalysis = (video: Video) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const analyze = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/ai-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: video.videoId,
          title: video.title,
          thumbnailUrl: `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 404) {
          setErrorMessage("コメントが見つかりませんでした");
        } else {
          setErrorMessage("分析に失敗しました");
        }
        return;
      }

      setSummary(data.response);
    } catch (error) {
      console.error("コメント取得に失敗しました", error);
      setErrorMessage("ネットワークエラーなどにより分析に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    summary,
    errorMessage,
    analyze,
  };
};
