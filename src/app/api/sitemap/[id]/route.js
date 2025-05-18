export async function GET(_, { params }) {
  const { id } = params;

  // Проверка на число
  if (!/^\d+$/.test(id)) {
    return new Response("Invalid sitemap ID", { status: 400 });
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
