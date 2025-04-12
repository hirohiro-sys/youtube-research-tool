"use client";

import Image from "next/image";
import { motion } from "motion/react";

type SearchProps = {
  keyword: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export const Search = ({ keyword, onChange, onSearch }: SearchProps) => {
  return (
    <motion.div
      className="flex justify-center mt-6"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 50 }}
    >
      <div className="card border border-gray-300 shadow-sm p-6 flex flex-row gap-4 rounded-xl">
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
          className="btn btn-neutral"
        >
          検索
        </button>
      </div>
    </motion.div>
  );
};
