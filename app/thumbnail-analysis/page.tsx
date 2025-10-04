"use client";

import type React from "react";

import Breadcrumb from "@/src/components/breadcrumb";
import { useFileUpload } from "@/src/tools/thumbnail-analysis/hooks/useFileUpload";
import { useVideoSearch } from "@/src/tools/thumbnail-analysis/hooks/useVideoSearch";
import { FileUploader } from "@/src/tools/thumbnail-analysis/components/fileUploader";
import { ChannelVideos } from "@/src/tools/thumbnail-analysis/components/channelVideos";
import { ThumbnailPreview } from "@/src/tools/thumbnail-analysis/components/thumbnailPreview";
// import { TimeLine } from "@/src/tools/thumbnail-analysis/components/timeline";
import Header from "@/src/components/header";
import { GalleryThumbnails } from "lucide-react";

export default function Page() {
  const { files, getRootProps, getInputProps, style, setFiles } =
    useFileUpload();
  const {
    previewMode,
    setPreviewMode,
    title,
    setTitle,
    channelId,
    setChannelId,
    keyword,
    setKeyword,
    videos,
    setVideos,
    channelVideos,
    setChannelVideos,
    handleSearchchannelVideos,
    shuffleVideos,
  } = useVideoSearch(files);

  return (
    <>
      <Header
        toolName="AIサムネイル比較ツール"
        icon={<GalleryThumbnails className="h-8 w-8 text-blue-600" />}
      />
      <div className="pt-22 flex-grow bg-white min-h-screen">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "AIサムネイル分析", href: "/thumbnail-analysis" },
          ]}
        />

        {/* 一通り実装終わったら消す */}
        <div
          role="alert"
          className="alert alert-info alert-outline w-[51%] m-auto"
        >
          <span>
            こちらのツールのメイン機能である「AI投票」は現在開発中です。またツール全体としてUI/UXに至らない部分があるかと思いますが、順次改修を進めていきますのでご了承ください。
          </span>
        </div>

        <FileUploader
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          title={title}
          setTitle={setTitle}
          style={style}
          files={files}
          setFiles={setFiles}
          setVideos={setVideos}
          setChannelVideos={setChannelVideos}
          setKeyword={setKeyword}
          setChannelId={setChannelId}
        />

        <div className="max-w-4xl mx-auto p-3 sm:p-4">
          {files.length > 0 && (
            <>
              <ThumbnailPreview
                previewMode={previewMode}
                setPreviewMode={setPreviewMode}
                title={title}
                keyword={keyword}
                setKeyword={setKeyword}
                handleSearchchannelVideos={handleSearchchannelVideos}
                shuffleVideos={shuffleVideos}
                videos={videos}
              />
              {/* <TimeLine
                previewMode={previewMode}
                videos={videos}
                title={title}
              /> */}
              <div>
                <p className="font-bold text-xl mt-10">AI投票(実装中🚧)</p>
                <p className="mb-2 text-gray-500">
                  アップロードしたサムネイルをAIが他動画と比較し、投票・フィードバックを行います
                </p>
              </div>

              <ChannelVideos
                channelId={channelId}
                setChannelId={setChannelId}
                channelVideos={channelVideos}
                handleSearchchannelVideos={handleSearchchannelVideos}
                title={title}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
