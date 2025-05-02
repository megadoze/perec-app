import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "ru"],
  defaultLocale: "ru",
});

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname === "/sitemap.xml") {
    return NextResponse.redirect(
      "https://storage.googleapis.com/perec-news.firebasestorage.app/sitemap-index.xml",
      307
    );
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(ru|en)/:path*", "/sitemap.xml"],
};
