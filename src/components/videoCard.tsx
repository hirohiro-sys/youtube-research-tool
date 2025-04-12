// components/VideoCard.tsx
import { Eye, Users } from "lucide-react";
import { Video } from "@/types/youtubeApiTypes";
import Image from "next/image";
import Link from "next/link";

export const VideoCard = ({ video }: { video: Video }) => (
  <div className="card bg-base-100 shadow-md">
    <figure>
      <Image
        src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
        alt={video.title}
        className="w-full h-48 object-cover"
        width={480}
        height={270}
      />
    </figure>
    <div className="card-body p-6">
      <h2 className="card-title">
        <Link
          href={`https://www.youtube.com/watch?v=${video.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-blue-600"
        >
          {video.title}
        </Link>
      </h2>
      <div className="flex flex-col gap-3">
        <p className="flex items-center gap-4 font-mono">
          <Eye />
          {Number(video.viewCount).toLocaleString()} 回
        </p>
        <p className="flex items-center gap-4 font-mono">
          <Users />
          {Number(video.subscriberCount).toLocaleString()} 人
        </p>
      </div>
    </div>
  </div>
);
