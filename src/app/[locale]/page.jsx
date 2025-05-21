import { getTranslations } from "next-intl/server";
import ClientHome from "@/components/clientHome";
import MainLayout from "@/components/mainLayout";
import { getHomePageData } from "@/lib/getHomePageData";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    verification: {
      google: "8LTXtEFH_48BWqVY1lWd-DfTpWijIm_wmUzw5ME260s", // ✅
    },
    alternates: {
      canonical: `https://perec.news/${locale}`, // ✅ canonical
    },
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

  const t = await getTranslations({ locale });
  const tCategoryName = {
    politics: t("categoryName.politics"),
    economics: t("categoryName.economics"),
    media: t("categoryName.media"),
    culture: t("categoryName.culture"),
    life: t("categoryName.life"),
    bezkupur: t("categoryName.bezkupur"),
  };

  const { newsByCategory, mainNews } = await getHomePageData(locale);

  const preloadImage = mainNews?.[2]?.images?.[0]?.url;

  return (
    <>
      {preloadImage && (
        <link
          rel="preload"
          as="image"
          href={preloadImage}
          fetchPriority="high"
        />
      )}
      <MainLayout
        news={mainNews}
        bezkupur={newsByCategory.bezkupur}
        locale={locale}
        t={tCategoryName}
      />
      <ClientHome
        politics={newsByCategory.politics}
        economics={newsByCategory.economics}
        life={newsByCategory.life}
        culture={newsByCategory.culture}
        media={newsByCategory.media}
        locale={locale}
        t={tCategoryName}
      />
    </>
  );
}
