import { type NextRequest } from "next/server";
import { updateSession } from "./src/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // 現在モニター等で不特定多数のアクセスがあるため、一時的に認証をスキップ
  // return await updateSession(request)
}

export const config = {
  matcher: [
    // 以下のパスは除外されます:
    // - api/auth/*
    // - _next/static, _next/image, favicon.ico, 画像関連ファイル
    "/((?!api/auth/.*|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
