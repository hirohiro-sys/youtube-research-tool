import { Upload } from "lucide-react";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";

type FileUploaderProps = {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  style: React.CSSProperties;
  title: string;
  setTitle: (title: string) => void;
};

export const FileUploader = ({
  getRootProps,
  getInputProps,
  style,
  title,
  setTitle,
}: FileUploaderProps) => {
  return (
    <>
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
          >
            <input {...getInputProps()} />
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-center text-sm font-medium text-gray-700 mb-1">
              ここにファイルをドラッグするか、クリックしてファイルを選択
            </p>
            <p className="text-xs text-gray-500">JPEG/PNG形式、1ファイルまで</p>
          </div>
          <input
            type="text"
            placeholder="タイトルを入力"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};
