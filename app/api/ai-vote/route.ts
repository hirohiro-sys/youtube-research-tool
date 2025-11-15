import { ai } from "@/src/lib/gemini/gemini";
import { aggregateResults, analyzeTopVideo, decideVotesAndReasonsWithImage, generateUploadedVideoAnalysis } from "@/src/tools/thumbnail-analysis/services/aiVote.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { selectedVideos, virtualUsers } = await req.json();

    const { userVotes } = await decideVotesAndReasonsWithImage(
      ai,
      selectedVideos,
      virtualUsers,
    );
    const voteReasons = userVotes;

    const { voteResults } = aggregateResults(selectedVideos, userVotes);

    const topVideoAnalysis = await analyzeTopVideo(
      ai,
      voteResults,
      userVotes,
      selectedVideos,
    );

    const uploadedVideo = selectedVideos[0];
    const uploadedVideoAnalysis = await generateUploadedVideoAnalysis(
      ai,
      uploadedVideo,
    );
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
