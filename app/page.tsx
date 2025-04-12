"use client";

import { useDownloadCSV } from "@/src/hooks/useDownloadCSV";
import { Search } from "@/src/components/search";
import { LoadMoreButton } from "@/src/components/loadMoreButton";
import { VideoList } from "@/src/components/videoList";
import { SearchResultHeader } from "@/src/components/searchResultHeader";
import { SearchResultMessage } from "@/src/components/searchResultMessage";
import { useVideoSearch } from "@/src/hooks/useVideoSearch";

export default function TopPage() {
  const {
    keyword,
    setKeyword,
    videos,
    loading,
    hasSearched,
    hasNextPage,
    handleSearch,
    handleLoadMore,
  } = useVideoSearch();
  const { downloadCSV } = useDownloadCSV();

  return (
    <div className="pt-30 flex-grow">
      <Search keyword={keyword} onChange={setKeyword} onSearch={handleSearch} />

      <SearchResultHeader
        videosCount={videos.length}
        onDownloadCSV={() => downloadCSV(videos, keyword)}
      />

      <SearchResultMessage
        hasSearched={hasSearched}
        hasVideos={videos.length > 0}
        loading={loading}
      />

      <VideoList videos={videos} />

      <LoadMoreButton
        onClick={handleLoadMore}
        hasNextPage={!!hasNextPage}
        hasVideos={videos.length > 0}
        loading={loading}
      />
    </div>
  );
}
