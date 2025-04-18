"use client";

import Image from "next/image";
import { motion } from "motion/react";

type SearchProps = {
  keyword: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
};

export const Search = ({
  keyword,
  onChange,
  onSearch,
  loading,
}: SearchProps) => {
  return (
    <motion.div
      className="flex justify-center mt-6"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 50 }}
    >
      <div className="card border border-gray-400 shadow-sm p-6 flex flex-row gap-4 rounded-xl">
        <label className="input">
          <Image
            src="./searchIcon.svg"
            alt="検索アイコン"
            width={20}
            height={20}
          />
          <input
            type="search"
            value={keyword}
            onChange={(e) => onChange(e.target.value)}
            placeholder="キーワードを入力してください"
            className="input-lg w-70"
          />
        </label>
        <button
          onClick={onSearch}
          disabled={!keyword}
          className="btn text-gray-800 font-semibold bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 border border-gray-400 shadow-md hover:from-gray-200 hover:via-gray-400 hover:to-gray-600 active:scale-95 transition-all duration-200"
        >
          {loading ? (
            <span className="loading loading-ring loading-xl"></span>
          ) : (
            <>検索</>
          )}
        </button>
      </div>
    </motion.div>
  );
};
