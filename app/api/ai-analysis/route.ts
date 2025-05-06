import { fetchData } from "@/src/lib/fetchData";
import { CommentItem } from "@/types/youtubeApiTypes";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { videoId } = await req.json();
  const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=30&videoId=${videoId}`;
  try {
    const data = await fetchData(url);
    const comments: string[] =
      data.items?.map((item: CommentItem) => item.snippet.topLevelComment.snippet.textDisplay) ?? [];
      if (comments.length === 0) return NextResponse.json({ error: "コメントが見つかりませんでした" }, { status: 404 });

    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: `
        # 命令
        与えたYoutubeコメントを参考にして、この動画が再生されている理由を分析してください。

        # コメント
        ${comments.map((c) => c.replace(/\s+/g, " ").trim()).join("\n")}

        # ルール
        - マークダウンやリストなどは一切使わず、プレーンなテキストのみで簡潔に5行程度で要約してください
        - 日本語で出力してください
        - 分析に必要なさそうなコメントは無視してください
        - なぜこの動画が多く再生されていて、人気があるのかに強く焦点を当ててください
        `,
      });
      
    return NextResponse.json({
        response: response.text,
    });
  } catch (error) {
    console.error("分析に失敗しました:", error);
    return NextResponse.json({ error: "分析に失敗しました" }, { status: 500 });
  }
}
