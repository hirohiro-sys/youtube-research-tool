import { Plus } from "lucide-react";

type LoadMoreButtonProps = {
  onClick: () => void;
  loading: boolean;
  hasNextPage: boolean;
  keyword: string;
};

export const LoadMoreButton = ({
  onClick,
  loading,
  hasNextPage,
  keyword,
}: LoadMoreButtonProps) => {
  return (
    <div className="text-center my-10">
      {loading ? (
        <span className="loading loading-dots loading-xl mt-20"></span>
      ) : (
        hasNextPage && (
          <button
            onClick={onClick}
            className="btn btn-neutral btn-outline px-10"
            disabled={!keyword}
          >
            <Plus />
            もっと見る
          </button>
        )
      )}
    </div>
  );
};
