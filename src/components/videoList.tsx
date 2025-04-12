import { VideoCard } from "./videoCard";
import { Video } from "@/types/youtubeApiTypes";

type VideoListProps = {
  videos: Video[];
};

export const VideoList = ({ videos }: VideoListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 px-20">
      {videos.map((video) => (
        <VideoCard key={video.videoId} video={video} />
      ))}
    </div>
  );
};
