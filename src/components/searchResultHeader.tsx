import { ArrowUpDown, Download } from "lucide-react";

type SearchResultHeaderProps = {
  setSortType: (type: "newest" | "popular") => void;
  videosCount: number;
  onDownloadCSV: () => void;
};

export const SearchResultHeader = ({
  setSortType,
  videosCount,
  onDownloadCSV,
}: SearchResultHeaderProps) => {
  return (
    <div className="flex justify-between items-center px-5 md:px-20 mt-10">
      {videosCount > 0 && (
        <>
          <p className="md:text-2xl font-bold">検索結果: {videosCount}件</p>
          <div>
            <div className="dropdown dropdown-left">
              <div
                tabIndex={0}
                role="button"
                className="btn bg-white border border-white shadow-none"
              >
                <ArrowUpDown />
                <span className="hidden md:inline">並び替える</span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <button onClick={() => setSortType("popular")}>倍率順</button>
                </li>
                <li>
                  <button onClick={() => setSortType("newest")}>
                    新しい順(デフォルト)
                  </button>
                </li>
              </ul>
            </div>
            <button
              onClick={onDownloadCSV}
              className="btn text-green-600 bg-white border border-gray-300"
            >
              <Download />
              <span className="hidden md:inline">CSVでダウンロード</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
