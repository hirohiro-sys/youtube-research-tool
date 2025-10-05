import { useState } from "react";
import { PreviewFile } from "../types/fileTypes";

export type VideoView = {
    videoId: string;
    title: string;
    duration: string 
    viewCount: string 
    daysAgo: number;
    channelName?: string
    thumbnail?: string
}

export const useVideoSearch = (files: PreviewFile[]) => {
    const [previewMode, setPreviewMode] = useState<"pc" | "sp">("pc");
    const [title, setTitle] = useState("");
    const [channelId, setChannelId] = useState("");
    const [videos, setVideos] = useState<VideoView[]>([]);
    const [previewVideos,setPreviewVideos] = useState<VideoView[]>([]);
    const [channelVideos,setChannelVideos] = useState<VideoView[]>([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearchchannelVideos = async (searchType: "keyword" | "channel") => {
      setLoading(true);
      try {
        let query = "";
        if (searchType === "keyword") {
          query = `keyword=${encodeURIComponent(keyword)}`;
        } else if (searchType === "channel") {
          query = `channelId=${channelId}`;
        }
    
        const response = await fetch(`/api/videos?${query}`);
        const data = await response.json();
    
        const demoVideo = {
          videoId: "demo-video",
          title,
          channelName: "あなたのチャンネル名",
          viewCount: 100,
          daysAgo: 1,
          duration: "5:30",
          thumbnail: files[0]?.preview,
        };
    
        if (searchType === "keyword") {
          setVideos([demoVideo, ...(data.videos || [])]);
          setPreviewVideos([demoVideo, ...(data.videos || [])].slice(0,6));
        } else {
          setChannelVideos([demoVideo, ...(data.videos || [])]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const shuffleVideos = () => {
      setPreviewVideos((prevVideos) => {
        const shuffled = [...prevVideos];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      });
    };
    

    return {
        previewMode,
        setPreviewMode,
        title,
        setTitle,
        channelId,
        setChannelId,
        keyword,
        setKeyword,
        videos,
        setVideos,
        previewVideos,
        setPreviewVideos,
        channelVideos,
        setChannelVideos,
        loading,
        handleSearchchannelVideos,
        shuffleVideos
    };
}