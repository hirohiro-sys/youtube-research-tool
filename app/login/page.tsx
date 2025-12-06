"use client"; // 後で消してLoginをクライアントコンポーネントにする(今は認証スキップしているので)

import Login from "@/src/components/logIn";
import React from "react";

export default function page() {
  return <Login />;
}
