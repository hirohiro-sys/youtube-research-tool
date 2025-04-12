import { Plus } from "lucide-react";

type LoadMoreButtonProps = {
  onClick: () => void;
  loading: boolean;
  hasNextPage: boolean;
  hasVideos: boolean;
};

export const LoadMoreButton = ({
  onClick,
  loading,
  hasNextPage,
  hasVideos,
}: LoadMoreButtonProps) => {
  return (
    <div className="text-center my-10">
      {loading ? (
        <span className="loading loading-dots loading-xl mt-20"></span>
      ) : (
        hasNextPage &&
        hasVideos && (
          <button
            onClick={onClick}
            className="btn btn-outline rounded-2xl shadow-lg"
          >
            <Plus />
            もっと見る
          </button>
        )
      )}
    </div>
  );
};
