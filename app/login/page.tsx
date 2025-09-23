"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle, signOut } from "@/src/lib/supabase-auth/authGoogle";

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  const handleGoogleLogout = async () => {
    const result = await signOut();
    console.log("ログアウトしました", result);
    if (result) router.refresh();
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>ログイン</button>
      <button onClick={handleGoogleLogout}>ログアウト</button>
    </div>
  );
}
