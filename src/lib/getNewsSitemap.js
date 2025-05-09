import { db, ref, get, child } from "@/lib/firebase";

export async function getNewsSitemap() {
  const snapshot = await get(child(ref(db), "news"));
  const newsData = snapshot.exists() ? snapshot.val() : {};

  const now = Date.now();
  const cutoff = now - 1000 * 60 * 60 * 48; // 48 часов назад

  const newsItems = Object.entries(newsData).flatMap(([_, item]) => {
    if (item.status !== "published" || item.publishedAt < cutoff) return [];

    const entries = [];

    for (const locale of ["ru", "en"]) {
      const t = item.translations?.[locale];
      if (!t?.title) continue;

      entries.push({
        loc: `https://perec.news/${locale}/${item.category}/${t.slug}`,
        title: t.title,
        date: new Date(item.publishedAt).toISOString(),
        lang: locale,
      });
    }

    return entries;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsItems
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    <news:news>
      <news:publication>
        <news:name>PEREC.news</news:name>
        <news:language>${item.lang}</news:language>
      </news:publication>
      <news:publication_date>${item.date}</news:publication_date>
      <news:title>${escapeXml(item.title)}</news:title>
    </news:news>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return xml;
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}
