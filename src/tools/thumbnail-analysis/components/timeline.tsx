import { VideoView } from "../hooks/useVideoSearch";

type TimeLineProps = {
  keyword: string;
  setKeyword: (keyword: string) => void;
  handleSearchchannelVideos: () => void;
  videos: VideoView[];
};

export const TimeLine = ({
  keyword,
  setKeyword,
  handleSearchchannelVideos,
  videos,
}: TimeLineProps) => {
  return (
    <>
      <div>
        <p className="font-bold text-xl mt-10">キーワード検索(実装中)</p>
        <p className="mb-2 text-gray-500">
          キーワードを入力すると、タイムラインプレビューを確認できます。
        </p>
        <input
          type="text"
          className="input"
          placeholder="キーワードを入力"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="btn"
          onClick={() => handleSearchchannelVideos()}
          disabled={!keyword}
        >
          検索
        </button>
        {videos?.length > 0 &&
          videos.map((video) => {
            return <p key={video.videoId}>{video.channelName}</p>;
          })}
      </div>
    </>
  );
};
