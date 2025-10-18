import { useState } from "react";
import { PreviewFile } from "../types/fileTypes";
import { VideoView } from "./useVideoSearch";

export type VirtualUser = {
    id: number;
    name: string;
    age: number;
    interest: string[];
    overview: string;
}

export const useAiVote = (files: PreviewFile[],title: string) => {
    const [targetUserRules, setTargetUserRules] = useState("");
    const [virtualUsers,setVirtualUsers] = useState<VirtualUser[]>([]);
    const [selectedVideos,setSelectedVideos] = useState<{videoId: string,title: string}[]>([])

    const handleSelectVideos = (video: VideoView) => {
        const isAlreadySelected = selectedVideos.some(
          (v) => v.videoId === video.videoId
        );
        if (isAlreadySelected) {
          setSelectedVideos((prev) =>
            prev.filter((v) => v.videoId !== video.videoId)
          );
        } else if (selectedVideos.length < 4) {
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

    // AI投票を実装予定
    console.log(files,title)

    return {
        targetUserRules,
        setTargetUserRules,
        generateVirtualUsers,
        virtualUsers,
        handleSelectVideos,
        selectedVideos,
    }
}