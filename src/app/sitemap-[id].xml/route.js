export const dynamic = "force-dynamic";

export async function GET(_, context) {
  const { params } = context;
  const { id } = params;

  if (!id || isNaN(Number(id))) {
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
