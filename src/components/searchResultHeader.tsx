import { Download } from "lucide-react";

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
          <button
            onClick={onDownloadCSV}
            className="btn btn-outline btn-success"
          >
            <Download />
            CSVでダウンロード
          </button>
        </>
      )}
    </div>
  );
};
