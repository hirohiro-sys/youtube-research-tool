import { ai } from "@/src/lib/gemini/gemini";
import {
  aggregateResults,
  analyzeTopVideo,
  decideVotesAndReasonsWithImage,
  generateUploadedVideoAnalysis,
} from "@/src/tools/thumbnail-analysis/services/aiVote.service";
import { NextRequest, NextResponse } from "next/server";

// タイムアウトエラーを防ぐために指定
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const start = performance.now();

  try {
    const { selectedVideos, virtualUsers } = await req.json();

    const { userVotes } = await decideVotesAndReasonsWithImage(
      ai,
      selectedVideos,
      virtualUsers,
    );
    const voteReasons = userVotes;

    const { voteResults } = aggregateResults(selectedVideos, userVotes);

    const uploadedVideo = selectedVideos[0];
    const [topVideoAnalysis, uploadedVideoAnalysis] = await Promise.all([
      analyzeTopVideo(ai, voteResults, userVotes, selectedVideos),
      generateUploadedVideoAnalysis(ai, uploadedVideo),
    ]);

    const end = performance.now();
    console.log(`AI投票 全処理時間: ${(end - start).toFixed(2)} ms`);

    return NextResponse.json({
      voteReasons,
      voteResults,
      topVideoAnalysis,
      uploadedVideoAnalysis,
    });
  } catch (error) {
    console.error("AI投票に失敗しました", error);
    return NextResponse.json(
      {
        error: "AI voting process failed.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

  // リクエスト側の実装
  // const aiVote = async () => {
  //   setIsVoting(true);
  //   try {
  //     const res = await fetch("/api/ai-vote", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         selectedVideos,
  //         virtualUsers,
  //       }),
  //     });

  //     if (!res.ok) {
  //       console.error("AI投票APIからエラーが返されました");
  //       return;
  //     }
  //     const data = await res.json();
  //     setVirtualUsers((prevUsers) =>
  //       prevUsers.map((user) => {
  //         const vote = data.voteReasons.find(
  //           (v: { userId: number }) => v.userId === user.id,
  //         );
  //         return vote ? { ...user, voteReason: vote.reason } : user;
  //       }),
  //     );
  //     setSelectedVideos((prevVideos) =>
  //       prevVideos.map((video) => {
  //         const voteCount =
  //           data.voteResults.find(
  //             (v: { videoId: string }) => v.videoId === video.videoId,
  //           )?.votes || 0;
  //         return { ...video, voteCount };
  //       }),
  //     );
  //     setTopVideoAnalysis(data.topVideoAnalysis);
  //     setUploadedVideosFeedback(data.uploadedVideoAnalysis);
  //   } catch (error) {
  //     console.error("AI投票に失敗しました", error);
  //   } finally {
  //     setIsVoting(false);
  //   }
  // };