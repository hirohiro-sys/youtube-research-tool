import { useEffect, useState } from "react";
import { PreviewFile } from "../types/fileTypes";
import { useDropzone } from "react-dropzone";


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