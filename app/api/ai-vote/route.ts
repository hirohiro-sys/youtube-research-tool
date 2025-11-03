import { VirtualUser } from "@/src/tools/thumbnail-analysis/hooks/useAiVote";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// サムネイル情報をgeminiに渡せる形式に変換する関数
async function fetchThumbnailBase64(
  video: {videoId: string,title: string,voteCount?: number}, 
  selectedVideos: {videoId: string,title: string,voteCount?: number}[]
): Promise<string> {
  // selectedVideosの最初の動画はアップロードされた動画なので、videoIdがすでにgeminiに渡せる形式になっている
  if (video.videoId === selectedVideos[0].videoId) return video.videoId
  const url = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
  const resp = await fetch(url);
  const buffer = await resp.arrayBuffer();
  const b64 = Buffer.from(buffer).toString("base64");
  return b64;
}

// 仮想ユーザーごとに投票とその理由を生成する関数
async function decideVotesAndReasonsWithImage(
  ai: GoogleGenAI,
  selectedVideos: { videoId: string; title: string; voteCount?: number }[],
  users: VirtualUser[]
): Promise<{ userVotes: { userId: number; videoId: string; reason: string }[] }> {
  
  const userVotes: { userId: number; videoId: string; reason: string }[] = [];

  for (const user of users) {
    const videoImages = await Promise.all(
      selectedVideos.map(async (v) => ({
        videoId: v.videoId,
        title: v.title,
        imageBase64: await fetchThumbnailBase64(v, selectedVideos),
      }))
    );

    const textPrompt = `
あなたは仮想ユーザー「${user.name}（年齢 ${user.age}）」です。
プロフィール: ${user.overview}
興味・関心: ${user.interest.join("、")}

以下の動画候補（タイトルと画像）を見て、最も自分に合うと思う動画を1つ選び、
選んだ理由を簡潔に日本語で説明してください。

出力形式:
{
  "videoId": "<選んだvideoId>",
  "reason": "<理由>"
}
`;
    const contents = [
      {
        role: "user",
        parts: [
          { text: textPrompt },
          ...videoImages.map((v) => ({
            inlineData: { mimeType: "image/jpeg", data: v.imageBase64 },
          })),
        ],
      },
    ];

    const resp = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents,
    });

    const text = resp.text ?? "";
    let parsed: { videoId: string; reason: string };

    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        videoId: selectedVideos[0].videoId,
        reason: "分析に失敗しました。",
      };
    }

    userVotes.push({
      userId: user.id,
      videoId: parsed.videoId,
      reason: parsed.reason,
    });
  }

  return { userVotes };
}

// 投票結果を集計する関数
function aggregateResults(
  videos: { videoId: string; title: string; voteCount?: number }[],
  userVotes: { userId: number; videoId: string; reason: string }[]
): {
  voteResults: { videoId: string; votes: number }[];
  topVideo: { videoId: string; title: string; voteCount?: number };
} {
  const counts: Record<string, number> = {};
  for (const v of videos) {
    counts[v.videoId] = 0;
  }
  for (const uv of userVotes) {
    counts[uv.videoId] += 1;
  }
  const voteResults = videos.map(v => ({
    videoId: v.videoId,
    votes: counts[v.videoId] ?? 0
  }));
  const topVideoId = voteResults.reduce((prev, curr) =>
    curr.votes > prev.votes ? curr : prev
  ).videoId;
  const topVideo = videos.find(v => v.videoId === topVideoId)!;

  return { voteResults, topVideo };
}

// 投票数トップの動画を分析する関数
async function analyzeTopVideo(
  ai: GoogleGenAI,
  topVideo: { videoId: string; title: string; voteCount?: number },
  userVotes: { userId: number; videoId: string; reason: string }[]
): Promise<string> {
  const reasonsForTop = userVotes
    .filter(v => v.videoId === topVideo.videoId)
    .map(v => `- ${v.reason}`)
    .join("\n");

  const prompt = `
以下の動画が複数のユーザーから最も多く投票されました。
動画タイトル: ${topVideo.title}

この動画が人気となった理由を、ユーザーの投票理由を参考にして簡潔に日本語で分析してください。
ユーザーの投票理由:
${reasonsForTop}

分析結果:
`;

  const resp = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  return resp.text?.trim() ?? "分析に失敗しました。";
}

// アップロードされた動画の改善案を生成する関数
async function generateUploadedVideoAnalysis(
  ai: GoogleGenAI,
  uploaded: {videoId: string,title: string,voteCount?: number},
): Promise<string> {
  const prompt = `
あなたは動画マーケティングの専門家です。ユーザーがアップロードした以下の動画について、サムネイルおよびタイトルを元に **視聴数を増やすための改善案** を箇条書きで3つ提示してください：
タイトル：${uploaded.title}
サムネイル画像（base64形式）：${uploaded.videoId}
  `;
  const resp = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: [
      {
        parts: [
          { text: prompt },
          { inlineData: { mimeType: "image/jpeg", data: uploaded.videoId } }
        ]
      }
    ]
  });
  return resp.text ?? "改善案を生成できませんでした。";
}

export async function POST(req: NextRequest) {
    try {
        const { selectedVideos, virtualUsers } = await req.json();
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        console.log(selectedVideos, virtualUsers,ai)
      
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