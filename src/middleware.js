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

  if (pathname === "/sitemap.xml") {
    return NextResponse.redirect(
      "https://storage.googleapis.com/perec-news.firebasestorage.app/sitemap-index.xml",
      307
    );
  }

  if (pathname === "/sitemap-news.xml") {
    return NextResponse.rewrite(new URL("/api/sitemap-news.xml", req.url));
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
