import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/src/components/footer";
import { headers } from "next/headers";
import { cachedValidateAuthWithRedirect } from "@/src/lib/supabase-auth/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Youtube動画作成支援ツール",
  description:
    "生成AIを用いてYoutubeの動画作成をサポートするプラットフォームです",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 認証チェック
  const headersList = await headers();
  const pathname = headersList.get("x-current-path");
  const isLoginPage = pathname?.startsWith("/login");
  if (!isLoginPage) await cachedValidateAuthWithRedirect();

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <main className="min-h-[100vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
