/*--- 
AI投票に関する型定義ファイル
---*/


// 選択されている投票対象の動画
export type selectedVideo = {
    videoId: string;
    title: string;
    voteCount?: number;
};

// ユーザーごとの投票理由
export type userVotes = {
    userId: number;
    videoId: string;
    title: string
    reason: string;
}

// 仮想ユーザーの型定義
export type VirtualUser = {
    id: number;
    name: string;
    age: number;
    interest: string[];
    overview: string;
    voteReason?: string
}