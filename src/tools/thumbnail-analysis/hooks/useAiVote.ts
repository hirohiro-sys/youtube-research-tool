import { useEffect, useState } from "react";
import { PreviewFile } from "../types/fileTypes";
import { VideoView } from "./useVideoSearch";

export type VirtualUser = {
    id: number;
    name: string;
    age: number;
    interest: string[];
    overview: string;
    voteReason?: string
}

export const useAiVote = (files: PreviewFile[],title: string) => {
    const [targetUserRules, setTargetUserRules] = useState("");
    const [virtualUsers,setVirtualUsers] = useState<VirtualUser[]>([]);
    const [selectedVideos,setSelectedVideos] = useState<{videoId: string,title: string,voteCount?: number}[]>([])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [topVideoAnalysis, setTopVideoAnalysis] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [uploadedVideosFeedback, setUploadedVideosFeedback] = useState("")

    const syncUploadedVideoTitle = (newTitle: string) => {
      setSelectedVideos((prev) =>
        prev.map((v, i) => (i === 0 ? { ...v, title: newTitle } : v))
      );
    };

    useEffect(() => {
      if (files.length === 0) return
      setSelectedVideos([{videoId: files[0].preview,title}])
    // タイトルをdepsに入れるとレンダリングの影響でいちいちビデオの選択状態が解除されるのでスルーしている
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[files])

    const handleSelectVideos = (video: VideoView) => {
        const isAlreadySelected = selectedVideos.some(
          (v) => v.videoId === video.videoId
        );
        if (isAlreadySelected) {
          setSelectedVideos((prev) =>
            prev.filter((v) => v.videoId !== video.videoId)
          );
        } else if (selectedVideos.length < 5) {
          setSelectedVideos((prev) => [
            ...prev,
            { videoId: video.videoId, title: video.title },
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
    }

    const aiVote = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res = await fetch("/api/ai-vote",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            selectedVideos,
            virtualUsers,
          }),
        })

        // const data = await res.json();
        // ペルソナごと投票理由を追記
        // ビデオごとの投票数を追記
        // 1位の動画の分析を追記
        // アップロードした動画に対するフィードバックを追記

      } catch (error) {
        console.error("AI投票に失敗しました",error)
      }
    }


    return {
        targetUserRules,
        setTargetUserRules,
        generateVirtualUsers,
        virtualUsers,
        handleSelectVideos,
        selectedVideos,
        aiVote,
        syncUploadedVideoTitle
    }
}