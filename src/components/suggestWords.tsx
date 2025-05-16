import { Search } from "lucide-react";

type suggestWordsProps = {
  suggestions: string[];
  onChange: (value: string) => void;
};

export default function SuggestWords({
  suggestions,
  onChange,
}: suggestWordsProps) {
  return (
    <div className="card max-w-4xl border border-gray-300 mx-5 md:mx-auto my-10">
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Search className="h-5 w-5 text-opacity-70" />
            関連キーワード
          </h2>
        </div>
        {suggestions.length === 0 ? (
          <p className="text-gray-500 text-sm md:text-lg md:text-center">
            関連キーワードが見つかりませんでした
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-2 text-sm bg-base-200 hover:bg-base-300 rounded-md cursor-pointer transition-colors"
                onClick={() => {
                  onChange(keyword);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
