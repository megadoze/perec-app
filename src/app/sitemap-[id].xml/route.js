export async function GET(_, ctx) {
  const id = ctx?.params?.id;

  if (!id || !/^\d+$/.test(id)) {
    return new Response("Invalid sitemap ID", { status: 400 });
  }

  const url = `https://storage.googleapis.com/perec-news.firebasestorage.app/sitemap-${id}.xml`;

  try {
    console.log("📡 FETCH:", url);
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      console.error("⚠️ FETCH ERROR:", res.status, text);
      return new Response(`Storage fetch failed: ${text}`, { status: 502 });
    }

    const xml = await res.text();
    console.log("✅ XML FETCHED:", xml.slice(0, 200)); // только начало, чтобы не было огромного вывода

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (err) {
    console.error("💥 FATAL ERROR:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
