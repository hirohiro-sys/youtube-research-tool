"use client";

import { useDownloadCSV } from "@/src/hooks/useDownloadCSV";
import { Search } from "@/src/components/search";
import { LoadMoreButton } from "@/src/components/loadMoreButton";
import { VideoList } from "@/src/components/videoList";
import { SearchResultHeader } from "@/src/components/searchResultHeader";
import { SearchResultMessage } from "@/src/components/searchResultMessage";
import { useVideoSearch } from "@/src/hooks/useVideoSearch";
import SuggestWords from "@/src/components/suggestWords";

export default function TopPage() {
  const {
    keyword,
    setKeyword,
    setSortType,
    range,
    setRange,
    scale,
    setScale,
    timeOption,
    setTimeOption,
    videos,
    loading,
    hasSearched,
    hasNextPage,
    handleSearch,
    handleLoadMore,
    suggestions,
  } = useVideoSearch();
  const { downloadCSV } = useDownloadCSV();

  return (
    <div className="pt-30 flex-grow">
      <Search
        keyword={keyword}
        onChange={setKeyword}
        range={range}
        setRange={setRange}
        scale={scale}
        setScale={setScale}
        timeOption={timeOption}
        setTimeOption={setTimeOption}
        onSearch={handleSearch}
        loading={loading}
      />

      <SearchResultHeader
        setSortType={setSortType}
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
        hasNextPage={hasNextPage}
        loading={loading}
        keyword={keyword}
      />

      {videos.length !== 0 && (
        <SuggestWords
          suggestions={suggestions}
          onSearch={handleSearch}
          onChange={setKeyword}
        />
      )}
    </div>
  );
}
