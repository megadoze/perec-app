// app/[locale]/page.js
import ClientHome from "@/components/clientHome";
import { getHomePageData } from "@/lib/getHomePageData";

export const dynamic = "force-static"; // ✅ включаем статическую генерацию
export const revalidate = 300; // ✅ обновлять раз в 5 минут

// ✅ Простая локализованная генерация мета-тегов без SSR
export async function generateMetadata({ params }) {
  const { locale } = await params;

  const dict = {
    ru: {
      title: "PEREC NEWS — свежие новости, мемы и ирония без купюр🔥",
      description:
        "Свежие новости, мемы и ирония без купюр. Perec бросает вызов традиционным медиа — информативно, остро, захватывающе!",
    },
    en: {
      title: "PEREC NEWS — fresh news, memes, and unfiltered irony🔥",
      description:
        "Fresh news, memes, and unfiltered irony. Perec challenges traditional media — sharp, bold, and addictive!",
    },
  };

  const t = dict[locale] ?? dict.ru;

  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: t.title,
      description: t.description,
      url: `https://perec.news/${locale}`,
      siteName: t.title,
      images: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media",
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [
        "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media",
      ],
    },
  };
}

export default async function HomePage({ params }) {
  const { locale } = await params;

  const { news, mainNews } = await getHomePageData(locale);

  return (
    <ClientHome
      initialNews={news}
      mainNews={mainNews}
      locale={locale}
      theme={null} // тема теперь берётся клиентом в ThemeInitializer
    />
  );
}

// import { getTranslations } from "next-intl/server";
// import ClientHome from "@/components/clientHome";
// import { getHomePageData } from "@/lib/getHomePageData";
// import { cookies } from "next/headers";

// export async function generateMetadata({ params }) {
//   const { locale } = await params;
//   const t = await getTranslations({ locale });

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

// export default async function HomePage({ params }) {
//   const { locale } = await params;

//   const cookie = await cookies();
//   const cookieTheme = cookie.get("theme")?.value;
//   const fallbackTheme = (() => {
//     const hour = new Date().getHours();
//     return hour >= 20 || hour < 7 ? "dark" : "light";
//   })();
//   const theme =
//     cookieTheme === "dark" || cookieTheme === "light"
//       ? cookieTheme
//       : fallbackTheme;

//   // console.log("🟡 Главная пересобирается:", Date.now());

//   const { news, mainNews } = await getHomePageData(locale);

//   return (
//     <ClientHome
//       initialNews={news}
//       mainNews={mainNews}
//       locale={locale}
//       theme={theme}
//     />
//   );
// }
// export const revalidate = 300;
