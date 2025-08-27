"use client";

import Breadcrumb from "@/src/components/breadcrumb";
import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import Image from "next/image";

type PreviewFile = File & { preview: string };
const baseStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "80%",
  height: 100,
  margin: "auto",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
export default function Page() {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
      maxFiles: 1,
    });

  const style: React.CSSProperties = {
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
  };
  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <Image
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          width={200}
          height={200}
          alt="サムネイル"
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="pt-22 flex-grow">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "AIサムネイル分析", href: "/thumbnail-analysis" },
        ]}
      />
      <section>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>
            ここにファイルをドラッグするか、クリックしてファイルを選択してください
            <br />
            (JPEG/PNG形式、1ファイルまで)
          </p>
        </div>
        <div className="flex justify-center">{thumbs}</div>
      </section>
    </div>
  );
}
