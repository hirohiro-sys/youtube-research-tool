import React from "react";
import { signInWithGoogle } from "../lib/supabase-auth/authGoogle";
import { FcGoogle } from "react-icons/fc";
import { TfiYoutube } from "react-icons/tfi";

export default function LogIn() {
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-white via-red-50 to-gray-50">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3 flex justify-center">
              <TfiYoutube className="text-red-600 mr-1" />
              Youtube動画作成支援ツール
            </h1>
            <p className="text-gray-600 text-base leading-relaxed">
              早速始めましょう！
            </p>
          </div>

          <div className="text-center">
            <button onClick={handleGoogleLogin} className="btn">
              <FcGoogle size={24} />
              <span className="text-lg">Googleでログイン</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 leading-relaxed">
              続けることにより、
              <a href="" className="text-blue-600 hover:underline">
                利用規約
              </a>
              に同意し、
              <a href="" className="text-blue-600 hover:underline">
                プライバシーポリシー
              </a>
              を理解した上で、個人情報の取り扱いに同意したものとみなされます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
