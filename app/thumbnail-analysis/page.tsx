"use client";

import type React from "react";

import Breadcrumb from "@/src/components/breadcrumb";
import { useFileUpload } from "@/src/tools/thumbnail-analysis/hooks/useFileUpload";
import { useVideoSearch } from "@/src/tools/thumbnail-analysis/hooks/useVideoSearch";
import { FileUploader } from "@/src/tools/thumbnail-analysis/components/fileUploader";
import { ChannelVideos } from "@/src/tools/thumbnail-analysis/components/channelVideos";
import { ThumbnailPreview } from "@/src/tools/thumbnail-analysis/components/thumbnailPreview";
import { TimeLine } from "@/src/tools/thumbnail-analysis/components/timeline";

export default function Page() {
  const {
    files,
    previewMode,
    setPreviewMode,
    getRootProps,
    getInputProps,
    style,
  } = useFileUpload();
  const {
    title,
    setTitle,
    channelId,
    setChannelId,
    keyword,
    setKeyword,
    videos,
    channelVideos,
    handleSearchchannelVideos,
  } = useVideoSearch();

  return (
    <div className="pt-22 flex-grow bg-white min-h-screen">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "AIサムネイル分析", href: "/thumbnail-analysis" },
        ]}
      />

      <FileUploader
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        title={title}
        setTitle={setTitle}
        style={style}
      />

      {files.length > 0 && (
        <>
          <div className="max-w-4xl mx-auto p-3 sm:p-4">
            <ThumbnailPreview
              previewMode={previewMode}
              setPreviewMode={setPreviewMode}
              files={files}
              title={title}
            />

            <ChannelVideos
              channelId={channelId}
              setChannelId={setChannelId}
              channelVideos={channelVideos}
              handleSearchchannelVideos={handleSearchchannelVideos}
              files={files}
              title={title}
            />

            <TimeLine
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearchchannelVideos={handleSearchchannelVideos}
              videos={videos}
            />
          </div>
        </>
      )}
    </div>
  );
}
