import {
  Play,
  Volume2,
  Settings,
  Maximize,
  MoreHorizontal,
  Monitor,
  Smartphone,
  ThumbsUp,
  ThumbsDown,
  Share,
  Download,
} from "lucide-react";
import Image from "next/image";
import { PreviewFile } from "../types/fileTypes";

type ThumbnailPreviewProps = {
  previewMode: "pc" | "sp";
  setPreviewMode: (mode: "pc" | "sp") => void;
  files: PreviewFile[];
  title: string;
};

export const ThumbnailPreview = ({
  previewMode,
  setPreviewMode,
  files,
  title,
}: ThumbnailPreviewProps) => {
  return (
    <>
      <div className="mb-4">
        <div className="bg-gray-200 rounded-lg shadow-md inline-flex">
          <button
            onClick={() => setPreviewMode("pc")}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors text-sm ${
              previewMode === "pc"
                ? "bg-white text-black font-bold"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>PC版</span>
          </button>
          <button
            onClick={() => setPreviewMode("sp")}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors text-sm ${
              previewMode === "sp"
                ? "bg-white text-black font-bold"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>SP版</span>
          </button>
        </div>
      </div>
      <div
        className={`${previewMode === "pc" ? "grid grid-cols-1 lg:grid-cols-3 gap-6" : "max-w-sm mx-auto"}`}
      >
        <div className={previewMode === "pc" ? "lg:col-span-2" : ""}>
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <Image
                src={files[0].preview || "/placeholder.svg"}
                width={640}
                height={480}
                alt="アップロードされた画像"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2 sm:p-3">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <button className="hover:bg-white/20 p-1 sm:p-1.5 rounded-full transition-colors">
                      <Play
                        className={`${previewMode === "sp" ? "w-4 h-4" : "w-5 h-5"} fill-white`}
                      />
                    </button>
                    <button className="hover:bg-white/20 p-1 sm:p-1.5 rounded-full transition-colors">
                      <Volume2
                        className={`${previewMode === "sp" ? "w-4 h-4" : "w-5 h-5"}`}
                      />
                    </button>
                    <span
                      className={`${previewMode === "sp" ? "text-xs" : "text-sm"} font-medium`}
                    >
                      0:00 / 10:24
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className="hover:bg-white/20 p-1 sm:p-1.5 rounded-full transition-colors">
                      <Settings
                        className={`${previewMode === "sp" ? "w-4 h-4" : "w-5 h-5"}`}
                      />
                    </button>
                    <button className="hover:bg-white/20 p-1 sm:p-1.5 rounded-full transition-colors">
                      <Maximize
                        className={`${previewMode === "sp" ? "w-4 h-4" : "w-5 h-5"}`}
                      />
                    </button>
                  </div>
                </div>
                <div className="w-full bg-white/20 h-1 rounded-full mt-2">
                  <div className="bg-[#ff0000] h-1 rounded-full w-1/3 relative">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-[#ff0000] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${previewMode === "sp" ? "p-3" : "p-4"}`}>
              <h1
                className={`${previewMode === "sp" ? "text-sm" : "text-lg"} font-semibold text-gray-900 mb-2 leading-tight`}
              >
                {title || "タイトル未設定"}
              </h1>

              <div
                className={`flex items-center justify-between ${previewMode === "sp" ? "text-xs" : "text-sm"} text-gray-600 mb-3`}
              >
                <span>123,456 回視聴 • 2024年1月15日</span>
              </div>

              <div
                className={`flex items-center justify-between ${previewMode === "sp" ? "mb-3" : "mb-4"}`}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`${previewMode === "sp" ? "w-7 h-7" : "w-9 h-9"} bg-white border rounded-full flex items-center justify-center`}
                  >
                    <span
                      className={`text-black font-bold ${previewMode === "sp" ? "text-xs" : "text-sm"}`}
                    >
                      -
                    </span>
                  </div>
                  <div>
                    <p
                      className={`font-medium text-gray-900 ${previewMode === "sp" ? "text-xs" : "text-sm"}`}
                    >
                      AIチャンネル
                    </p>
                    <p
                      className={`${previewMode === "sp" ? "text-xs" : "text-sm"} text-gray-600`}
                    >
                      120万人のチャンネル登録者
                    </p>
                  </div>
                </div>

                <button
                  className={`bg-black text-white ${previewMode === "sp" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"} rounded-full font-medium transition-colors flex items-center space-x-1`}
                >
                  <span>チャンネル登録</span>
                </button>
              </div>

              <div
                className={`flex items-center ${previewMode === "sp" ? "space-x-1" : "space-x-2"} mb-3`}
              >
                <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                  <button
                    className={`flex items-center space-x-1 ${previewMode === "sp" ? "px-2 py-1" : "px-3 py-1.5"} hover:bg-gray-200 transition-colors`}
                  >
                    <ThumbsUp
                      className={`${previewMode === "sp" ? "w-3 h-3" : "w-4 h-4"} text-gray-700`}
                    />
                    <span
                      className={`text-gray-700 font-medium ${previewMode === "sp" ? "text-xs" : "text-sm"}`}
                    >
                      1.2K
                    </span>
                  </button>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <button
                    className={`${previewMode === "sp" ? "px-2 py-1" : "px-3 py-1.5"} hover:bg-gray-200 transition-colors`}
                  >
                    <ThumbsDown
                      className={`${previewMode === "sp" ? "w-3 h-3" : "w-4 h-4"} text-gray-700`}
                    />
                  </button>
                </div>

                <button
                  className={`flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 ${previewMode === "sp" ? "px-2 py-1" : "px-3 py-1.5"} rounded-full transition-colors`}
                >
                  <Share
                    className={`${previewMode === "sp" ? "w-3 h-3" : "w-4 h-4"} text-gray-700`}
                  />
                  <span
                    className={`text-gray-700 font-medium ${previewMode === "sp" ? "text-xs" : "text-sm"}`}
                  >
                    共有
                  </span>
                </button>

                <button
                  className={`flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 ${previewMode === "sp" ? "px-2 py-1" : "px-3 py-1.5"} rounded-full transition-colors`}
                >
                  <Download
                    className={`${previewMode === "sp" ? "w-3 h-3" : "w-4 h-4"} text-gray-700`}
                  />
                  <span
                    className={`text-gray-700 font-medium ${previewMode === "sp" ? "text-xs" : "text-sm"}`}
                  >
                    保存
                  </span>
                </button>

                <button
                  className={`bg-gray-100 hover:bg-gray-200 ${previewMode === "sp" ? "p-1" : "p-1.5"} rounded-full transition-colors`}
                >
                  <MoreHorizontal
                    className={`${previewMode === "sp" ? "w-3 h-3" : "w-4 h-4"} text-gray-700`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {previewMode === "pc" ? (
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                関連動画
              </h3>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex space-x-2 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="w-20 h-12 bg-gray-200 rounded flex-shrink-0 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ff0000]/20 to-transparent"></div>
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        8:06
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 line-clamp-2 mb-1">
                        AIサムネイル分析で再生回数アップ！効果的なデザインのコツ
                        #{i}
                      </p>
                      <p className="text-xs text-gray-600 mb-0.5">
                        AIチャンネル
                      </p>
                      <p className="text-xs text-gray-600">
                        100万回視聴・1週間前
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                関連動画
              </h3>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex space-x-2 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="w-16 h-10 bg-gray-200 rounded flex-shrink-0 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ff0000]/20 to-transparent"></div>
                      <div className="absolute bottom-0.5 right-0.5 bg-black/80 text-white text-xs px-1 rounded">
                        8:06
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 line-clamp-2 mb-1">
                        AIサムネイル分析で再生回数アップ！#{i}
                      </p>
                      <p className="text-xs text-gray-600 mb-0.5">
                        AIチャンネル
                      </p>
                      <p className="text-xs text-gray-600">
                        100万回視聴・1週間前
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>{" "}
    </>
  );
};
