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
import { AiVote } from "@/src/tools/thumbnail-analysis/components/ai-vote/aiVote";
import { useAiVote } from "@/src/tools/thumbnail-analysis/hooks/useAiVote";

// export const maxDuration = 30; // 後で必要かどうかのテストをする

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
    previewVideos,
    setPreviewVideos,
    channelVideos,
    setChannelVideos,
    handleSearchchannelVideos,
    shuffleVideos,
    loading,
  } = useVideoSearch(files);
  const {
    targetUserRules,
    setTargetUserRules,
    generateVirtualUsers,
    virtualUsers,
    handleSelectVideos,
    selectedVideos,
    syncUploadedVideoTitle,
    aiVote,
    initializeSelectedVideos,
    topVideoAnalysis,
    uploadedVideosFeedback,
    isGeneratingVirtualUsers,
    isVoting,
  } = useAiVote(files, title);
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

        <FileUploader
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          title={title}
          setTitle={setTitle}
          style={style}
          files={files}
          setFiles={setFiles}
          setVideos={setVideos}
          setPreviewVideos={setPreviewVideos}
          setChannelVideos={setChannelVideos}
          setKeyword={setKeyword}
          setChannelId={setChannelId}
          syncUploadedVideoTitle={syncUploadedVideoTitle}
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
                previewVideos={previewVideos}
                loading={loading}
                initializeSelectedVideos={initializeSelectedVideos}
              />
              {/* <TimeLine
                previewMode={previewMode}
                videos={videos}
                title={title}
              /> */}

              <AiVote
                videos={videos}
                title={title}
                targetUserRules={targetUserRules}
                setTargetUserRules={setTargetUserRules}
                generateVirtualUsers={generateVirtualUsers}
                virtualUsers={virtualUsers}
                handleSelectVideos={handleSelectVideos}
                selectedVideos={selectedVideos}
                aiVote={aiVote}
                topVideoAnalysis={topVideoAnalysis}
                uploadedVideosFeedback={uploadedVideosFeedback}
                isGeneratingVirtualUsers={isGeneratingVirtualUsers}
                isVoting={isVoting}
              />

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
