"use client";

import Breadcrumb from "@/src/components/breadcrumb";
import { LoadMoreButton } from "@/src/tools/demand-analysis/components/loadMoreButton";
import { Search } from "@/src/tools/demand-analysis/components/search";
import { SearchResultHeader } from "@/src/tools/demand-analysis/components/searchResultHeader";
import { SearchResultMessage } from "@/src/tools/demand-analysis/components/searchResultMessage";
import SuggestWords from "@/src/tools/demand-analysis/components/suggestWords";
import { VideoList } from "@/src/tools/demand-analysis/components/videoList";
import { useDownloadCSV } from "@/src/tools/demand-analysis/hooks/useDownloadCSV";
import { useVideoSearch } from "@/src/tools/demand-analysis/hooks/useVideoSearch";

export default function Page() {
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
    <div className="pt-22 flex-grow">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "AI需要分析", href: "/demand-analysis" },
        ]}
      />

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
