import { getTranslations } from "next-intl/server";
import ClientHome from "@/components/clientHome";
import { getHomePageData } from "@/lib/getHomePageData";

export async function generateMetadata({ params }) {
  const { locale } = params;
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
  const { locale } = params;

  console.log("🟡 Главная пересобирается:", Date.now());

  const { news, mainNews } = await getHomePageData(locale);

  return <ClientHome initialNews={news} mainNews={mainNews} locale={locale} />;
}

// import { getTranslations } from "next-intl/server";
// import ClientHome from "@/components/clientHome";
// import { db, ref, get, child } from "@/lib/firebase";
// import { unstable_cache } from "next/cache";

// export async function generateMetadata({ params }) {
//   const { locale } = await params;

//   const t = await getTranslations({ locale: locale });

//   return {
//     title: t("metaTitle"),
//     description: t("metaDescription"),
//     openGraph: {
//       title: t("metaTitle"),
//       description: t("metaDescription"),
//       url: `https://perec.news/${locale}`,
//       siteName: t("metaTitle"),
//       images: [
//         {
//           url: "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media",
//           width: 1200,
//           height: 630,
//           alt: t("metaTitle"),
//         },
//       ],
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: t("metaTitle"),
//       description: t("metaTwitterDescription"),
//       images: [
//         "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media",
//       ],
//     },
//   };
// }

// export const revalidate = 0;
// export const dynamic = "force-dynamic";

// export default async function HomePage({ params }) {
//   const { locale } = await params;

// let news = [];
// let mainNews = [];

// console.log("🟡 Главная пересобирается:", Date.now());

// const { news, mainNews } = await getHomePageData(locale);

// try {
// const [newsSnapshot, mainSnapshot] = await Promise.all([
//   get(child(ref(db), "news")),
//   get(child(ref(db), "main_news")),
// ]);
// const newsData = newsSnapshot.exists() ? newsSnapshot.val() : {};
// const mainData = mainSnapshot.exists() ? mainSnapshot.val() : {};
// news = Object.entries(newsData)
//   .map(([id, item]) => ({ _id: id, ...item }))
//   .filter((item) => {
//     const t = item.translations?.[locale];
//     return (
//       item.status === "published" && t?.title?.trim() && t?.content?.trim()
//     );
//   })
//   .sort((a, b) => b.publishedAt - a.publishedAt)
//   .slice(0, 100);
// mainNews = Object.entries(mainData)
//   .map(([id, item]) => ({ _id: id, ...item }))
//   .filter((item) => {
//     const t = item.translations?.[locale];
//     return t?.title?.trim() && t?.content?.trim();
//   })
//   .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
//   .slice(0, 5);
// console.log(mainNews);
// console.log(
//   "mainNews hash",
//   JSON.stringify(mainNews.map((n) => n._id + n.order + n.updatedAt))
// );
// } catch (error) {
//   console.error("Ошибка при загрузке новостей:", error);
// }

// return <ClientHome initialNews={news} mainNews={mainNews} locale={locale} />;
