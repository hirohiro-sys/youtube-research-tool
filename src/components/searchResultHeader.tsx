import { ArrowUpDown, Download } from "lucide-react";

type SearchResultHeaderProps = {
  videosCount: number;
  onDownloadCSV: () => void;
};

export const SearchResultHeader = ({
  videosCount,
  onDownloadCSV,
}: SearchResultHeaderProps) => {
  return (
    <div className="flex justify-between items-center px-20 mt-10">
      {videosCount > 0 && (
        <>
          <p className="text-2xl font-bold">検索結果: {videosCount}件</p>
          <div>
            <div className="dropdown dropdown-left">
              <div
                tabIndex={0}
                role="button"
                className="btn bg-white border border-white shadow-none"
              >
                <ArrowUpDown />
                並び替える
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <p>新しい順</p>
                </li>
                <li>
                  <p>倍率順</p>
                </li>
                <li>
                  <p>元に戻す</p>
                </li>
              </ul>
            </div>
            <button
              onClick={onDownloadCSV}
              className="btn text-green-600 bg-white border border-gray-300"
            >
              <Download />
              CSVでダウンロード
            </button>
          </div>
        </>
      )}
    </div>
  );
};
