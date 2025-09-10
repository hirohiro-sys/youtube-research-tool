import { useState } from "react";

export type channelVideo = {
    videoId: string;
    title: string;
    duration: string 
    viewCount: string 
    daysAgo: number;
}

export const useVideoSearch = () => {
    const [title, setTitle] = useState("");
    const [channelId, setChannelId] = useState("");
    const [channelVideos, setChannelVideos] = useState<channelVideo[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearchchannelVideos = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/channel-videos?channelId=${channelId}`);
          const data = await response.json();
          setChannelVideos(data.videos || []);
        } catch (error) {
          console.error("データの取得に失敗しました:", error);
        } finally {
          setLoading(false);
        }
      };

    return {
        title,
        setTitle,
        channelId,
        setChannelId,
        channelVideos,
        loading,
        handleSearchchannelVideos,
    };
}