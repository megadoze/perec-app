// Vercel Edge API Route (Next.js 13+ App Router)
// export const runtime = "edge";

export async function GET() {
  const sitemapUrl =
    "https://storage.googleapis.com/perec-news.firebasestorage.app/sitemap-index.xml";

  const response = await fetch(sitemapUrl);

  if (!response.ok) {
    return new Response("Failed to fetch sitemap", { status: 500 });
  }

  const xml = await response.text();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-cache",
    },
  });
}
