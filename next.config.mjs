import path from "path";
import { fileURLToPath } from "url";
import nextIntlPlugin from "next-intl/plugin"; // ✅ подключаем плагин

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextIntl = nextIntlPlugin({
  // Указываем локали и дефолт
  locales: ["en", "ru"],
  defaultLocale: "ru",
  localePrefix: "always",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {},
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "firebasestorage.googleapis.com",
  //       pathname: "/**",
  //     },
  //   ],
  // },
  images: {
    unoptimized: true, // ⛔️ отключает Vercel-оптимизацию полностью
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/sitemap-:id(\\d+).xml",
        destination: "/sitemap-[id].xml",
      },
    ];
  },
};

// ⬇️ экспортируем с обёрткой next-intl
export default withNextIntl(nextConfig);
