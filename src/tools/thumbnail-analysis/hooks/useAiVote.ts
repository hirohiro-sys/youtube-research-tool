import { useState } from "react";

export const useAiVote = () => {
    const [targetUser, setTargetUser] = useState("");
    return {
        targetUser,
        setTargetUser,
    }
}