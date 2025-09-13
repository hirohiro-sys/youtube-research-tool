import { useState } from "react";

export type VideoView = {
    videoId: string;
    title: string;
    duration: string 
    viewCount: string 
    daysAgo: number;
    channelName?: string
}

export const useVideoSearch = () => {
    const [previewMode, setPreviewMode] = useState<"pc" | "sp">("pc");
    const [title, setTitle] = useState("");
    const [channelId, setChannelId] = useState("");
    const [videos, setVideos] = useState<VideoView[]>([]);
    const [channelVideos,setChannelVideos] = useState<VideoView[]>([])
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearchchannelVideos = async () => {
      setLoading(true);
      try {
        let query = "";
    
        if (keyword && keyword.trim() !== "") {
          query = `keyword=${encodeURIComponent(keyword)}`;
        } else {
          query = `channelId=${channelId}`;
        }
    
        const response = await fetch(`/api/videos?${query}`);
        const data = await response.json();
        if (keyword) {
          setVideos(data.videos || []);
        } else {
          setChannelVideos(data.videos || []);
        }    
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
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
        channelVideos,
        loading,
        handleSearchchannelVideos,
    };
}