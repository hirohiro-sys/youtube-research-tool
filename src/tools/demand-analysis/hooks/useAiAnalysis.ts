import { useState } from "react";
import { Video } from "../types/youtubeApiTypes";
import { aiAnalysisAction } from "../actions/aiAnalysis";

export const useAiAnalysis = (video: Video) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setErrorMessage("");
  
    try {
      const res = await aiAnalysisAction({
        videoId: video.videoId,
        title: video.title,
        thumbnailUrl: `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`,
      });
  
      if (res.error) {
        if (res.status === 404) {
          setErrorMessage("コメントが見つかりませんでした");
        } else {
          setErrorMessage("分析に失敗しました");
        }
        return;
      }
  
      setSummary(res.response || "");
    } catch (e) {
      console.error("エラー:", e);
      setErrorMessage("ネットワークエラーなどにより分析に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    summary,
    errorMessage,
    handleAnalyze,
  };
};
