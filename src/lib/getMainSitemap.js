import { db, ref, get, child } from "@/lib/firebase";

const siteUrl = "https://perec.news";
const locales = ["ru", "en"];
const categories = [
  "politics",
  "economics",
  "life",
  "culture",
  "bezkupur",
  "media",
];
const staticPages = ["about", "ads", "contacts", "podcasts"];

export async function getMainSitemap() {
  const snapshot = await get(child(ref(db), "news"));
  const newsData = snapshot.exists() ? snapshot.val() : {};
  const now = new Date().toISOString();

  const urls = [];

  // Новости с hreflang
  Object.values(newsData).forEach((item) => {
    if (item.status !== "published") return;

    const ru = item.translations?.ru;
    const en = item.translations?.en;
    const category = item.category;
    if (!category) return;

    const lastmod = new Date(
      item.updatedAt || item.publishedAt || item.createdAt
    ).toISOString();

    if (ru?.slug) {
      const ruUrl = `${siteUrl}/ru/${category}/${ru.slug}`;
      const enUrl = en?.slug ? `${siteUrl}/en/${category}/${en.slug}` : ruUrl;

      urls.push({
        loc: ruUrl,
        alternates: [
          { hreflang: "ru", href: ruUrl },
          ...(en?.slug ? [{ hreflang: "en", href: enUrl }] : []),
          { hreflang: "x-default", href: ruUrl },
        ],
        lastmod,
        changefreq: "daily",
        priority: "0.8",
      });
    }

    if (en?.slug) {
      const enUrl = `${siteUrl}/en/${category}/${en.slug}`;
      const ruUrl = ru?.slug ? `${siteUrl}/ru/${category}/${ru.slug}` : enUrl;

      urls.push({
        loc: enUrl,
        alternates: [
          { hreflang: "en", href: enUrl },
          ...(ru?.slug ? [{ hreflang: "ru", href: ruUrl }] : []),
          { hreflang: "x-default", href: enUrl },
        ],
        lastmod,
        changefreq: "daily",
        priority: "0.8",
      });
    }
  });

  // Категории и статические страницы (без hreflang)
  for (const locale of locales) {
    categories.forEach((cat) => {
      urls.push({
        loc: `${siteUrl}/${locale}/${cat}`,
        lastmod: now,
        changefreq: "monthly",
        priority: "0.3",
      });
    });

    staticPages.forEach((page) => {
      urls.push({
        loc: `${siteUrl}/${locale}/${page}`,
        lastmod: now,
        changefreq: "monthly",
        priority: "0.3",
      });
    });
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    urls
      .map((u) => {
        const altLinks = u.alternates
          ? u.alternates
              .map(
                (alt) =>
                  `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`
              )
              .join("\n    ")
          : "";
        return `<url>
  <loc>${u.loc}</loc>
  ${altLinks}
  <lastmod>${u.lastmod}</lastmod>
  <changefreq>${u.changefreq}</changefreq>
  <priority>${u.priority}</priority>
</url>`;
      })
      .join("\n") +
    `\n</urlset>`;

  return xml;
}
