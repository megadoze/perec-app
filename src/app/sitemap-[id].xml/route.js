export async function GET(_, ctx) {
  const id = ctx?.params?.id;

  if (!id || !/^\d+$/.test(id)) {
    return new Response("Invalid sitemap ID", { status: 400 });
  }

  const firebaseUrl = `https://storage.googleapis.com/perec-news.firebasestorage.app/sitemap-${id}.xml`;

  try {
    const res = await fetch(firebaseUrl);

    if (!res.ok) {
      const text = await res.text();
      return new Response(`Storage fetch failed: ${text}`, { status: 502 });
    }

    const xml = await res.text();

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (err) {
    console.error("💥 Ошибка загрузки sitemap:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
