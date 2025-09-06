import { useState } from "react";

export const useVideoSearch = () => {
    const [title, setTitle] = useState("");
    const [channelId, setChannelId] = useState("");
    return {
        title,
        setTitle,
        channelId,
        setChannelId,
    };
}