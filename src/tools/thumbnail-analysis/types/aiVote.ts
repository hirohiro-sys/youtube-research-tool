// AI投票に関する型定義ファイル

export type selectedVideo = {
    videoId: string;
    title: string;
    voteCount?: number;
};

export type userVotes = {
    userId: number;
    videoId: string;
    reason: string;
}