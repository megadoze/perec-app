import { getTranslations } from "next-intl/server";
import ClientHome from "@/components/clientHome";
import { getHomePageData } from "@/lib/getHomePageData";
import { cookies } from "next/headers";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://perec.news/${locale}`,
      siteName: t("metaTitle"),
      images: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media",
          width: 1200,
          height: 630,
          alt: t("metaTitle"),
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaTwitterDescription"),
      images: [
        "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media",
      ],
    },
  };
}

export default async function HomePage({ params }) {
  const { locale } = await params;

  const cookie = await cookies();
  const cookieTheme = cookie.get("theme")?.value;
  const fallbackTheme = (() => {
    const hour = new Date().getHours();
    return hour >= 20 || hour < 7 ? "dark" : "light";
  })();
  const theme =
    cookieTheme === "dark" || cookieTheme === "light"
      ? cookieTheme
      : fallbackTheme;

  // console.log("🟡 Главная пересобирается:", Date.now());

  const { news, mainNews } = await getHomePageData(locale);

  return (
    <ClientHome
      initialNews={news}
      mainNews={mainNews}
      locale={locale}
      theme={theme}
    />
  );
}
export const revalidate = 300;
