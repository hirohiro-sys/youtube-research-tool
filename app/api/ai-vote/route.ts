import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { uploadedThumbnail, title, selectedVideos, virtualUsers } = await req.json();
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        console.log(uploadedThumbnail, title, selectedVideos, virtualUsers,ai)
      
      return NextResponse.json({
        // voteReasons,             // それぞれのVirtualUserがその動画に投票した理由をvoteReasonに入れるためのテキスト(idと紐つけて返す)
        // voteResults,             // それぞれの動画の投票数(videoIdと紐つけて返す)
        // topVideoAnalysis,        // 投票率1位の動画の分析テキスト
        // uploadedVideoAnalysis,   // ユーザーがアップロードした動画(サムネイル、タイトル)の改善案提示
      });
    } catch (error) {
        console.error("AI投票に失敗しました",error)
    }
}