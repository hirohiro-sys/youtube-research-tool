import { useEffect, useState } from "react";
import { PreviewFile } from "../types/fileTypes";
import { VideoView } from "./useVideoSearch";
import { selectedVideo, VirtualUser } from "../types/aiVote";

export const useAiVote = (files: PreviewFile[], title: string) => {
  const [targetUserRules, setTargetUserRules] = useState("");
  const [virtualUsers, setVirtualUsers] = useState<VirtualUser[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<selectedVideo[]>([]);
  const [topVideoAnalysis, setTopVideoAnalysis] = useState("");
  const [uploadedVideosFeedback, setUploadedVideosFeedback] = useState("");

  const syncUploadedVideoTitle = (newTitle: string) => {
    setSelectedVideos((prev) =>
      prev.map((v, i) => (i === 0 ? { ...v, title: newTitle } : v)),
    );
  };

  useEffect(() => {
    if (files.length === 0) return;
    setSelectedVideos([{ videoId: "demo-video", title, thumbnailInfo: files[0].base64 }]);
    // タイトルをdepsに入れるとレンダリングの影響でいちいちビデオの選択状態が解除されるのでスルーしている
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const initializeSelectedVideos = () => {
    setSelectedVideos([{ videoId: "demo-video", title, thumbnailInfo: files[0].base64 }]);
  }

  const handleSelectVideos = (video: VideoView) => {
    const isAlreadySelected = selectedVideos.some(
      (v) => v.videoId === video.videoId,
    );
    if (isAlreadySelected) {
      setSelectedVideos((prev) =>
        prev.filter((v) => v.videoId !== video.videoId),
      );
    } else if (selectedVideos.length < 5) {
      setSelectedVideos((prev) => [
        ...prev,
        { videoId: video.videoId, title: video.title, thumbnailInfo: `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg` || "" },
      ]);
    }
  };

  const generateVirtualUsers = async () => {
    try {
      const res = await fetch("/api/virtual-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserRules,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        return;
      }

      setVirtualUsers(data.virtualUsers);
    } catch (error) {
      console.error("仮想ユーザーの生成に失敗しました", error);
    }
  };

  const aiVote = async () => {
    try {
      const res = await fetch("/api/ai-vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedVideos,
          virtualUsers,
        }),
      });

      if (!res.ok) {
        console.error("AI投票APIからエラーが返されました");
        return;
      }
      const data = await res.json();
      setVirtualUsers((prevUsers) =>
        prevUsers.map((user) => {
          const vote = data.voteReasons.find(
            (v: { userId: number }) => v.userId === user.id,
          );
          return vote ? { ...user, voteReason: vote.reason } : user;
        }),
      );
      setSelectedVideos((prevVideos) =>
        prevVideos.map((video) => {
          const voteCount =
            data.voteResults.find(
              (v: { videoId: string }) => v.videoId === video.videoId,
            )?.votes || 0;
          return { ...video, voteCount };
        }),
      );
      setTopVideoAnalysis(data.topVideoAnalysis);
      setUploadedVideosFeedback(data.uploadedVideoAnalysis);

      // ログで確認できたらUI表示
      console.log("仮想ユーザーの投票理由: ", data.voteReasons);
      console.log("投票結果: ", data.voteResults);
      console.log("投票数トップの動画分析: ", data.topVideoAnalysis);
      console.log(
        "アップロード動画へのフィードバック: ",
        data.uploadedVideoAnalysis,
      );
    } catch (error) {
      console.error("AI投票に失敗しました", error);
    }
  };

  return {
    targetUserRules,
    setTargetUserRules,
    generateVirtualUsers,
    virtualUsers,
    handleSelectVideos,
    selectedVideos,
    aiVote,
    syncUploadedVideoTitle,
    topVideoAnalysis,
    uploadedVideosFeedback,
    initializeSelectedVideos
  };
};
