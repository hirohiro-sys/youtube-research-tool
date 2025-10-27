import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { uploadedThumbnail, title, selectedVideos, virtualUsers } = await req.json();
        // reqで受け取ったデータをAIに渡せる形にする(stateの型と照らし合わせる)
        // 紐付けがむずいな。どうやるか
    } catch (error) {
        console.error("AI投票に失敗しました",error)
    }
}