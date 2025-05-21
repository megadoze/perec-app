import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "ru"],
  defaultLocale: "ru",
});

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const ua = req.headers.get("user-agent") || "";

  // Перехватываем тему из куки
  const theme = req.cookies.get("theme")?.value;

  // 🧱 Исключаем sitemap-роуты
  if (pathname === "/sitemap.xml" || pathname === "/sitemap-news.xml") {
    return NextResponse.next();
  }

  // 🔁 Только Telegram — редирект на OG-страницу
  if (
    ua.includes("TelegramBot") &&
    /^\/(ru|en)\/[^/]+\/[^/]+$/.test(pathname) // типа /ru/politics/slug
  ) {
    const ogUrl = req.nextUrl.clone();
    ogUrl.pathname = `/og${pathname}`;
    return NextResponse.rewrite(ogUrl);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(ru|en)/:path*", "/sitemap.xml", "/sitemap-news.xml"],
};

  // matcher: [
  //   "/((?!_next|favicon.ico|.well-known|sitemap.xml|sitemap-news.xml).*)",
  // ],