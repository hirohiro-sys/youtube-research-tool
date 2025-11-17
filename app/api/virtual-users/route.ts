import { ai } from "@/src/lib/gemini/gemini";
import { NextResponse } from "next/server";

// タイムアウトエラーを防ぐために指定
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { targetUserRules } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: [
        {
          text: `
            # 命令
            あなたはある条件からYoutubeの仮想ユーザーを作成する専門家です。
            以下の条件をもとに、Youtubeの仮想ユーザーを16人作成してください。
            # ルール
            ${targetUserRules}
            # 出力形式
            [
              {
                "id": 1,
                "name": "田中太郎",
                "age": 22,
                "interest": ["プログラミング", "ゲーム", "音楽"],
                "overview": "大学生でプログラミング初心者。将来はIT企業に就職したいと考えている。"
              }
            ]
          `,
        },
      ],
    });

    let jsonText = response.text!;

    jsonText = jsonText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let virtualUsers;
    try {
      virtualUsers = JSON.parse(jsonText);
    } catch (e) {
      console.error("AI出力のJSONパースに失敗しました", e, response.text);
      return NextResponse.json(
        { error: "AIの出力がJSON形式ではありません" },
        { status: 500 },
      );
    }

    return NextResponse.json({ virtualUsers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "仮想ユーザーの生成に失敗しました" },
      { status: 500 },
    );
  }
}
