export const dynamic = 'force-dynamic';

export async function GET(_, context) {
  const { params } = context;
  const { id } = params || {};

  if (!id || isNaN(Number(id))) {
    console.error("❌ Invalid sitemap ID:", id);
    return new Response("Invalid sitemap ID", { status: 400 });
  }

  const url = `https://storage.googleapis.com/perec-news.firebasestorage.app/sitemap-${id}.xml`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error("❌ Fetch failed:", url, "Status:", res.status);
      return new Response("Failed to fetch sitemap", { status: 502 });
    }

    const xml = await res.text();

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
