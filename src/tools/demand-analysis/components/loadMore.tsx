import { useRef, useCallback, useEffect } from "react";

type LoadMoreProps = {
  onLoadMore: () => void;
  loading: boolean;
  hasNextPage: boolean;
  keyword: string;
};

export const LoadMore = ({
  onLoadMore,
  loading,
  hasNextPage,
  keyword,
}: LoadMoreProps) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasNextPage && keyword) {
        onLoadMore();
      }
    },
    [loading, hasNextPage, onLoadMore, keyword]
  );

  useEffect(() => {
    const element = sentinelRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "0px 0px -600px 0px",
      threshold: 1.0,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <div className="text-center">
      {loading ? (
        <span className="loading loading-dots loading-xl mt-10"></span>
      ) : (
        <div ref={sentinelRef} className="h-10"></div>
      )}
    </div>
  );
};
