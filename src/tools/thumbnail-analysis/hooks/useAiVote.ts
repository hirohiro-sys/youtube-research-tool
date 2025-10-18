import { useState } from "react";

export type VirtualUser = {
    id: number;
    name: string;
    age: number;
    interest: string[];
    overview: string;
}

export const useAiVote = () => {
    const [targetUserRules, setTargetUserRules] = useState("");
    const [virtualUsers,setVirtualUsers] = useState<VirtualUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const generateVirtualUsers = async () => {
        setLoading(true);
        setErrorMessage("");

        try {
            const res = await fetch("/api/virtual-users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    targetUserRules,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                setErrorMessage("仮想ユーザーの生成に失敗しました");
                return;
            }

            setVirtualUsers(data.virtualUsers);
        } catch (error) {
            console.error("仮想ユーザーの生成に失敗しました", error);
            setErrorMessage("ネットワークエラーなどにより仮想ユーザーの生成に失敗しました");
        } finally {
            setLoading(false);
        }
    }

    return {
        targetUserRules,
        setTargetUserRules,
        generateVirtualUsers,
        virtualUsers,
        loading,
        errorMessage,
    }
}