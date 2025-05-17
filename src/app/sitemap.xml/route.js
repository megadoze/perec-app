export async function GET() {
  const firebaseUrl =
    "https://storage.googleapis.com/perec-news.firebasestorage.app/sitemap-index.xml";

  const res = await fetch(firebaseUrl);

  if (!res.ok) {
    return new Response("Failed to fetch sitemap from storage", {
      status: 502,
    });
  }

  const xml = await res.text();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=300", // кэш 5 минут
    },
  });
}
