import { getAllCategorySlugs, getAllNewsSlugs } from "./scripts/sitemapData.js";

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://perec-app.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  alternateRefs: [
    {
      href: "https://perec-app.vercel.app/",
      hreflang: "ru",
    },
    {
      href: "https://perec-app.vercel.app/en",
      hreflang: "en",
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
  },
  additionalPaths: async () => {
    const news = await getAllNewsSlugs();
    const categories = await getAllCategorySlugs();

    return [
      // Добавляем новости
      ...news.map((n) => ({
        loc: `/${n.category}/${n.slug}`, // <--- вот так
        lastmod: new Date().toISOString(),
      })),

      // Добавляем категории
      ...categories.map((slug) => ({
        loc: `/${slug}`, // <--- категории — без префикса /category/
        lastmod: new Date().toISOString(),
      })),
    ];
  },
};

export default config;
