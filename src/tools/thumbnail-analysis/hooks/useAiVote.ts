import { useState } from "react";

export const useAiVote = () => {
    const [targetUserRules, setTargetUserRules] = useState("");
    return {
        targetUserRules,
        setTargetUserRules,
    }
}