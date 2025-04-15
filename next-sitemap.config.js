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
};

export default config;
