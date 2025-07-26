import { motion } from "motion/react";
import Image from "next/image";

type SearchResultMessageProps = {
  hasSearched: boolean;
  loading: boolean;
  hasVideos: boolean;
};

export const SearchResultMessage = ({
  hasSearched,
  loading,
  hasVideos,
}: SearchResultMessageProps) => {
  if (loading || hasVideos) return;

  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="p-6 inline-flex mb-4">
          <Image
            src="/searchIcon.svg"
            alt="検索アイコン"
            width={60}
            height={60}
          />
        </div>
        <h3 className="text-xl font-bold mb-2">
          {hasSearched
            ? "検索結果が見つかりませんでした"
            : "動画を検索してみましょう"}
        </h3>
        <p className="text-gray-500 text-xs md:text-base">
          {hasSearched
            ? "別のキーワードを試すか、再度検索してみてください"
            : "キーワードを入力して、需要のある動画を検索できます"}
        </p>
      </motion.div>
    </div>
  );
};
