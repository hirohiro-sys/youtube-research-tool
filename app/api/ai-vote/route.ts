import {
  selectedVideo,
  userVotes,
  VirtualUser,
} from "@/src/tools/thumbnail-analysis/types/aiVote";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

 // サムネイル情報をgeminiに渡せる形式に変換する関数
async function fetchThumbnailBase64(video: selectedVideo): Promise<string> {
  if (video.videoId==="demo-video") {
      // "data:image/jpeg;base64," のようなプレフィックスを取り除いてgeminiに渡せる形式に変換
      const commaIndex = video.thumbnailInfo.indexOf(',');
      return video.thumbnailInfo.substring(commaIndex + 1);
  };

  const resp = await fetch(video.thumbnailInfo);
  const buffer = await resp.arrayBuffer();
  return Buffer.from(buffer).toString("base64");
}

// 仮想ユーザーごとに投票とその理由を生成する関数
async function decideVotesAndReasonsWithImage(
  ai: GoogleGenAI,
  selectedVideos: selectedVideo[],
  users: VirtualUser[],
): Promise<{ userVotes: userVotes[] }> {
  const userVotes: userVotes[] = [];

  const videoImages = await Promise.all(
    selectedVideos.map(async (v) => ({
      videoId: v.videoId,
      title: v.title,
      imageBase64: await fetchThumbnailBase64(v),
    })),
  );

  for (const user of users) {
const contents = [
  {
    role: "user",
    parts: [
      {
        text: `
あなたは仮想ユーザー「${user.name}（年齢 ${user.age}）」です。
プロフィール: ${user.overview}
興味・関心: ${user.interest.join("、")}

次の動画候補（タイトルとサムネイル画像）を見て、最も自分に合うと思う動画を1つ選び、
選んだ理由を簡潔に日本語で説明してください。なぜそのサムネイルをクリックしたのかも言及してください。
【出力形式】(JSON形式のみで回答してください)
{
  "videoId": "<選んだvideoId>",
  "reason": "<理由>"
}
`,
      },
      ...videoImages.flatMap((v, index) => [
        {
          text: `動画 ${index + 1}:\n- videoId: ${v.videoId}\n- title: ${v.title}`,
        },
        {
          inlineData: { mimeType: "image/jpeg", data: v.imageBase64 },
        },
      ]),
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
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.log("投票理由の生成に失敗しました",err)
      parsed = {
        videoId: selectedVideos[0].videoId,
        reason: "分析に失敗しました。",
      };
    }

    const video = selectedVideos.find((v) => v.videoId === parsed.videoId)

    userVotes.push({
      userId: user.id,
      videoId: parsed.videoId,
      title: video ? video.title : "動画のタイトルを取得できませんでした。",
      reason: parsed.reason,
    });
  }

  return { userVotes };
}

// 投票結果を集計する関数
function aggregateResults(
  videos: selectedVideo[],
  userVotes: userVotes[],
): {
  voteResults: { videoId: string; votes: number }[];
} {

  const counts: Record<string, number> = {};
  for (const v of videos) {
    counts[v.videoId] = 0;
  }

  for (const uv of userVotes) {
    counts[uv.videoId] = (counts[uv.videoId] || 0) + 1;
  }
  
  const voteResults = videos.map((v) => ({
    videoId: v.videoId,
    votes: counts[v.videoId] ?? 0,
  }));

  return { voteResults };
}

// 投票数トップの動画を分析する関数
async function analyzeTopVideo(
  ai: GoogleGenAI,
  voteResults: { videoId: string; votes: number }[],
  userVotes: userVotes[],
  videos: selectedVideo[],
): Promise<string> {
  
  const topVideoId = voteResults.reduce((prev, curr) =>
    curr.votes > prev.votes ? curr : prev,
  ).videoId;
  const topVideo = videos.find((v) => v.videoId === topVideoId)!;

  const imageBase64 = await fetchThumbnailBase64(topVideo);

  const reasonsForTop = userVotes
    .filter((v) => v.videoId === topVideo.videoId)
    .map((v) => `- ${v.reason}`)
    .join("\n");

  const prompt = `
以下は最も多く投票された動画です。
動画タイトル: ${topVideo.title}

この動画のサムネイル画像と、ユーザーの投票理由を参考にして、
「なぜこの動画が人気になったのか」を簡潔に分析してください。

ユーザー投票理由:
${reasonsForTop || "（この動画への投票理由はありません）"}

分析は**日本語**で出力してください。
`;

  const resp = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageBase64,
            },
          },
        ],
      },
    ],
  });

  return resp.text?.trim() ?? "分析に失敗しました。";
}


// アップロードされた動画の改善案を生成する関数
async function generateUploadedVideoAnalysis(
  ai: GoogleGenAI,
  uploaded: selectedVideo,
): Promise<string> {
  const prompt = `
あなたは動画マーケティングの専門家です。ユーザーがアップロードした以下の動画について、サムネイルおよびタイトルを元に **視聴数を増やすための改善案** を箇条書きで3つ提示してください：
タイトル：${uploaded.title}
サムネイル画像（base64形式）: ${uploaded.videoId}
`;

  const imageBase64 = await fetchThumbnailBase64(uploaded);
  const resp = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: [
      {
        parts: [
          { text: prompt },
          { inlineData: { mimeType: "image/jpeg", data: imageBase64 } },
        ],
      },
    ],
  });
  return resp.text ?? "改善案を生成できませんでした。";
}


export async function POST(req: NextRequest) {
  try {
    const { selectedVideos, virtualUsers } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set.");
      throw new Error("AI configuration is missing.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const { userVotes } = await decideVotesAndReasonsWithImage(
      ai,
      selectedVideos,
      virtualUsers,
    );
    const voteReasons = userVotes;

    const { voteResults } = aggregateResults(
      selectedVideos,
      userVotes,
    );

    const topVideoAnalysis = await analyzeTopVideo(ai, voteResults, userVotes, selectedVideos);

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
