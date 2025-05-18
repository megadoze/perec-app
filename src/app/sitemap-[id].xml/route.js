export async function GET(_, ctx) {
  const id = ctx?.params?.id;

  if (!id) {
    return new Response("Sitemap ID is required", { status: 400 });
  }

  const res = await fetch(
    `https://storage.googleapis.com/perec-news.firebasestorage.app/sitemap-${id}.xml`
  );

  if (!res.ok) {
    return new Response("Failed to fetch sitemap", { status: 502 });
  }

  const xml = await res.text();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=300",
    },
  });
}
