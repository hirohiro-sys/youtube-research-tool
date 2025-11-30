import { useState } from "react";
import { PreviewFile } from "../types/fileTypes";
import { keywordSearch } from "../actions/keywordSearch";

export type VideoView = {
  videoId: string;
  title: string;
  duration: string;
  viewCount: string;
  daysAgo: number;
  channelName?: string;
  thumbnail?: string;
};

export const useVideoSearch = (files: PreviewFile[]) => {
  const [previewMode, setPreviewMode] = useState<"pc" | "sp">("pc");
  const [title, setTitle] = useState("");
  const [channelId, setChannelId] = useState("");
  const [videos, setVideos] = useState<VideoView[]>([]);
  const [previewVideos, setPreviewVideos] = useState<VideoView[]>([]);
  const [channelVideos, setChannelVideos] = useState<VideoView[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  // keywordとchannelは分けるべきかもだが、どちらも似たような処理かつ複雑ではないので一旦まとめている
  const handleSearchVideos = async (
    searchType: "keyword" | "channel",
  ) => {
      setLoading(true);
  
      try {
        const data = await keywordSearch({
          keyword: searchType === "keyword" ? keyword : undefined,
          channelId: searchType === "channel" ? channelId : undefined,
        });
  
        const demoVideo = {
          videoId: "demo-video",
          title,
          channelName: "あなたのチャンネル名",
          viewCount: 100,
          daysAgo: 1,
          duration: "5:30",
          thumbnail: files[0]?.base64,
        };
  
        if (searchType === "keyword") {
          const list = [demoVideo, ...(data.videos || [])];
          setVideos(list);
          setPreviewVideos(list.slice(0, 6));
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
    handleSearchVideos,
    shuffleVideos,
  };
};
