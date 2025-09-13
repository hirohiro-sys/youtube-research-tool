"use client";

import type React from "react";

import Breadcrumb from "@/src/components/breadcrumb";
import { useFileUpload } from "@/src/tools/thumbnail-analysis/hooks/useFileUpload";
import { useVideoSearch } from "@/src/tools/thumbnail-analysis/hooks/useVideoSearch";
import { FileUploader } from "@/src/tools/thumbnail-analysis/components/fileUploader";
import { ChannelVideos } from "@/src/tools/thumbnail-analysis/components/channelVideos";
import { ThumbnailPreview } from "@/src/tools/thumbnail-analysis/components/thumbnailPreview";

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

            <div>
              <p className="font-bold text-xl mt-10">キーワード検索(実装中)</p>
              <p className="mb-2 text-gray-500">
                キーワードを入力すると、タイムラインプレビューを確認できます。
              </p>
              <input
                type="text"
                className="input"
                placeholder="キーワードを入力"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                className="btn"
                onClick={() => handleSearchchannelVideos()}
                disabled={!keyword}
              >
                検索
              </button>
              {videos?.length > 0 &&
                videos.map((video) => {
                  return <p key={video.videoId}>{video.channelName}</p>;
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
