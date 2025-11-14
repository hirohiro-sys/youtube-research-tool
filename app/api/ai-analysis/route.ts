import { CommentItem } from "@/src/tools/demand-analysis/types/youtubeApiTypes";
import { fetchData } from "@/src/tools/demand-analysis/utils/fetchData";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { videoId, title, thumbnailUrl } = await req.json();
  const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=50&videoId=${videoId}`;
  try {
    const data = await fetchData(url);
    const comments: string[] =
      data.items?.map(
        (item: CommentItem) => item.snippet.topLevelComment.snippet.textDisplay,
      ) ?? [];
    if (comments.length === 0)
      return NextResponse.json(
        { error: "コメントが見つかりませんでした" },
        { status: 404 },
      );

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const thumbnail = await fetch(thumbnailUrl);
    const imageArrayBuffer = await thumbnail.arrayBuffer();
    const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageData,
              },
            },
            {
              text: `
    # 命令
    あなたはYouTubeの動画がなぜヒットしたかを分析できる分析家です。
    動画のタイトルとサムネイル、投稿されたコメントから、動画が再生されている理由を分析します。
    以下のルールを踏まえて動画が再生されている理由を考えてください
    # 分析のルール
    1. サムネイルにもっとも動画視聴されている理由がある可能性が高いです
    2. 次にタイトルをみて動画が視聴されている理由があるかをチェックしてください
    3. 1,2を踏まえてコメントを分析してください。ポジティブなコメントは動画視聴のきっかけやユーザーが役に立ったことなどが書かれている可能性が高いので意識して分析してください。
    4. 1,2,3を踏まえてこの動画が再生されている理由を考えてください。この動画はチャンネル登録者より再生数が多いため何かしらの試聴されている理由が存在するので、その理由を見つけ出してください
    # 出力のルール
    適宜マークダウンや改行を入れてください
    日本語で出力してください
    # 出力形式
    各ステップのタイトルのフォントをボールドにしてください
    1. サムネイル分析
    (サムネイルを分析した結果)
    2. タイトル分析
    (タイトルを分析した結果)
    3. コメント分析
    (再生されている理由がわかるコメントの一覧)
    (再生されている理由の要約)
    4. 再生されている理由
    (1,2,3を踏まえて再生されている理由を要約して表示)
    分析には以下の情報を利用してください
    #動画のサムネイル
    ${thumbnailUrl}
    #動画タイトル
    ${title}
    # コメント
    ${comments.map((c) => c.replace(/\s+/g, " ").trim()).join("\n")}
              `,
            },
          ],
        },
      ],
    });

    return NextResponse.json({
      response: response.text,
    });
  } catch (error) {
    console.error("分析に失敗しました:", error);
    return NextResponse.json({ error: "分析に失敗しました" }, { status: 500 });
  }
}
