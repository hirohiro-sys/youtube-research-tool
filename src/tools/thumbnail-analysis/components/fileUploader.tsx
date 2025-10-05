import { Upload, X } from "lucide-react";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { PreviewFile } from "../types/fileTypes";
import Image from "next/image";
import { VideoView } from "../hooks/useVideoSearch";

type FileUploaderProps = {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  style: React.CSSProperties;
  title: string;
  setTitle: (title: string) => void;
  files: PreviewFile[];
  setFiles: (files: PreviewFile[]) => void;
  setVideos: (videos: VideoView[]) => void;
  setPreviewVideos: (videos: VideoView[]) => void;
  setChannelVideos: (videos: VideoView[]) => void;
  setKeyword: (keyword: string) => void;
  setChannelId: (channelId: string) => void;
};

export const FileUploader = ({
  getRootProps,
  getInputProps,
  style,
  title,
  setTitle,
  files,
  setFiles,
  setVideos,
  setPreviewVideos,
  setChannelVideos,
  setKeyword,
  setChannelId,
}: FileUploaderProps) => {
  const removeFile = (file: PreviewFile) => {
    URL.revokeObjectURL(file.preview);
    setFiles([]);
    setVideos([]);
    setPreviewVideos([]);
    setChannelVideos([]);
    setTitle("");
    setKeyword("");
    setChannelId("");
  };
  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-4">
      <p className="font-bold text-xl mb-2">サムネイルと動画タイトル</p>
      <p className="mb-2 text-gray-500">
        サムネイルをアップロードすると、Youtube上での見え方をプレビュー、AI投票やFB改善を行います
      </p>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
        <div
          {...getRootProps({
            style,
          })}
          className="relative flex flex-col items-center justify-center"
        >
          <input {...getInputProps()} />

          {files.length > 0 ? (
            <div className="relative w-full h-48">
              <Image
                src={files[0].preview}
                alt="uploaded thumbnail"
                fill
                className="object-contain rounded"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-black/60 rounded-full p-1 hover:bg-black/80"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(files[0]);
                }}
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-center text-sm font-medium text-gray-700 mb-1">
                ここにファイルをドラッグするか、クリックしてファイルを選択
              </p>
              <p className="text-xs text-gray-500">
                JPEG/PNG形式、1ファイルまで
              </p>
            </>
          )}
        </div>

        <input
          type="text"
          placeholder="タイトルを入力"
          className="input mt-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </div>
  );
};
