import { useEffect, useState } from "react";
import { PreviewFile } from "../types/fileTypes";
import { useDropzone } from "react-dropzone";


async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

const baseStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
    height: 200,
    marginBottom: 20,
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

export const useFileUpload = () => {
    const [files, setFiles] = useState<PreviewFile[]>([]);
    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
      useDropzone({
        accept: {
          "image/jpeg": [".jpeg", ".jpg"],
          "image/png": [".png"],
        },
        onDrop: async (acceptedFiles) => {
          const filePromises = acceptedFiles.map(async (file) => {
            const base64 = await fileToBase64(file);
            return Object.assign(file, {
              preview: URL.createObjectURL(file), // これはもういらんかも
              base64,
            });
          });
          const withBase64 = await Promise.all(filePromises);
          setFiles(withBase64);
        },
        maxFiles: 1,
        disabled: files.length > 0, 
      });
  
    const style: React.CSSProperties = {
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    };
  
    useEffect(() => {
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    return {
        files,
        setFiles,
        getRootProps,
        getInputProps,
        style,
    }
}