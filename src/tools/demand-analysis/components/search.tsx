import { motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { Range } from "../types/youtubeApiTypes";

type SearchProps = {
  keyword: string;
  onChange: (value: string) => void;
  range: Range;
  setRange: (range: Range) => void;
  scale: string;
  setScale: (scale: string) => void;
  timeOption: string;
  setTimeOption: (time: string) => void;
  onSearch: (suggestKeyword?: string) => void;
  loading: boolean;
};

export const Search = ({
  keyword,
  onChange,
  range,
  setRange,
  timeOption,
  setTimeOption,
  scale,
  setScale,
  onSearch,
  loading,
}: SearchProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) onSearch();
  };

  return (
    <motion.div
      className="flex justify-center"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 50 }}
    >
      <div>
        <div className="flex justify-center items-center h-[3rem]">
          <input
            type="search"
            value={keyword}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="キーワードを入力してください"
            className="input input-lg h-full w-60 md:w-[500px]"
          />
          <button
            onClick={() => onSearch()}
            disabled={!keyword || loading}
            className="btn h-full hidden md:block text-gray-900 bg-gradient-to-b from-gray-200 via-gray-00 to-gray-500 border border-gray-400 shadow-md hover:from-gray-200 hover:via-gray-400 hover:to-gray-600 active:scale-95 transition-all duration-200"
          >
            {loading ? (
              <span className="loading loading-ring loading-xl"></span>
            ) : (
              <SearchIcon className="text-white w-5" />
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-center mt-5 gap-2">
          <select
            className="select select-bordered rounded-full w-full md:w-auto"
            value={timeOption}
            onChange={(e) => setTimeOption(e.target.value)}
          >
            <option value="default">3分以上</option>
            <option value="short">3分以内(ショート)</option>
          </select>
          <select
            className="select select-bordered rounded-full w-full md:w-auto"
            value={range}
            onChange={(e) => setRange(e.target.value as Range)}
          >
            <option value="all">全期間</option>
            <option value="6months">6ヶ月以内</option>
            <option value="3months">3ヶ月以内</option>
            <option value="1month">1ヶ月以内</option>
            <option value="1week">1週間以内</option>
          </select>

          <select
            className="select select-bordered rounded-full w-full md:w-auto"
            value={scale}
            onChange={(e) => setScale(e.target.value)}
          >
            <option value="3">3倍</option>
            <option value="2">2倍</option>
          </select>
          <button
            onClick={() => onSearch()}
            disabled={!keyword || loading}
            className="btn h-full  py-1 md:hidden text-gray-900 bg-gradient-to-b from-gray-200 via-gray-00 to-gray-500 border border-gray-400 shadow-md hover:from-gray-300 hover:via-gray-400 hover:to-gray-600 active:scale-95 transition-all duration-200"
          >
            {loading ? (
              <span className="loading loading-ring loading-xl"></span>
            ) : (
              <SearchIcon className="text-white w-5" />
            )}
          </button>
        </div>
        <button
          className="btn btn-link rounded-full block mx-auto"
          onClick={() => {
            setRange("all");
            setScale("3");
            setTimeOption("default");
          }}
        >
          検索条件をクリア
        </button>
      </div>
    </motion.div>
  );
};
