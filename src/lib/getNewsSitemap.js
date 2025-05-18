import { db, ref, get, child } from "@/lib/firebase";

export async function getNewsSitemap() {
  const snapshot = await get(child(ref(db), "news"));
  const newsData = snapshot.exists() ? snapshot.val() : {};

  const now = Date.now();
  const cutoff = now - 1000 * 60 * 60 * 48; // 48 часов назад

  const newsItems = [];

  Object.values(newsData).forEach((item) => {
    if (item.status !== "published" || item.publishedAt < cutoff) return;

    const category = item.category;
    if (!category) return;

    const ru = item.translations?.ru;
    const en = item.translations?.en;
    const pubDate = new Date(item.publishedAt).toISOString();

    if (ru?.title && ru?.slug) {
      const ruUrl = `https://perec.news/ru/${category}/${ru.slug}`;
      const enUrl = en?.slug
        ? `https://perec.news/en/${category}/${en.slug}`
        : ruUrl;

      newsItems.push({
        loc: ruUrl,
        lang: "ru",
        title: ru.title,
        date: pubDate,
        alternates: [
          { hreflang: "ru", href: ruUrl },
          ...(en?.slug ? [{ hreflang: "en", href: enUrl }] : []),
          { hreflang: "x-default", href: ruUrl },
        ],
      });
    }

    if (en?.title && en?.slug) {
      const enUrl = `https://perec.news/en/${category}/${en.slug}`;
      const ruUrl = ru?.slug
        ? `https://perec.news/ru/${category}/${ru.slug}`
        : enUrl;

      newsItems.push({
        loc: enUrl,
        lang: "en",
        title: en.title,
        date: pubDate,
        alternates: [
          { hreflang: "en", href: enUrl },
          ...(ru?.slug ? [{ hreflang: "ru", href: ruUrl }] : []),
          { hreflang: "x-default", href: enUrl },
        ],
      });
    }
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${newsItems
  .map((item) => {
    const altLinks = item.alternates
      .map(
        (alt) =>
          `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`
      )
      .join("\n    ");
    return `  <url>
    <loc>${item.loc}</loc>
    ${altLinks}
    <news:news>
      <news:publication>
        <news:name>PEREC.news</news:name>
        <news:language>${item.lang}</news:language>
      </news:publication>
      <news:publication_date>${item.date}</news:publication_date>
      <news:title>${escapeXml(item.title)}</news:title>
    </news:news>
  </url>`;
  })
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
