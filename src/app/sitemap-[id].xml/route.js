export async function GET(_, ctx) {
  const id = ctx?.params?.id;

  if (!id || !/^\d+$/.test(id)) {
    return new Response("Invalid sitemap ID", { status: 400 });
  }

  const url = `https://storage.googleapis.com/perec-news.firebasestorage.app/sitemap-${id}.xml`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      return new Response(`Fetch failed: ${res.status} ${text}`, {
        status: 502,
      });
    }

    const xml = await res.text();

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=300", // кэшируем на 5 минут
      },
    });
  } catch (err) {
    console.error("💥 ROUTE error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
