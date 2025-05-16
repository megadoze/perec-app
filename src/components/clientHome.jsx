import Link from "next/link";
import LazyCategoryFourH from "./lazyCategoryFourH";
import LazyCategorySix from "./lazyCategorySix";
import LazyCategorySixV from "./lazyCategorySixV";
import LazyCategoryMediaFour from "./lazyCategoryMediaFour";

export default function ClientHome({
  initialNews,
  mainNews,
  theme,
  locale,
  t,
}) {
  const news = initialNews;
  const mainNewsIds = mainNews.map((n) => n._id);

  const filterNews = (category, limit) =>
    news
      .filter(
        (item) => item.category === category && !mainNewsIds.includes(item._id)
      )
      .slice(0, limit);

  const politics = filterNews("politics", 4);
  const economics = filterNews("economics", 4);
  const life = filterNews("life", 6);
  const culture = filterNews("culture", 6);
  const media = filterNews("media", 4);

  return (
    <>
      <h1 className="sr-only">
        {locale === "ru"
          ? "Острые новости, мемы, ирония и безжалостная правда — Perec.news приправляет инфополе"
          : "Spicy news, memes, irony, and merciless truth — Perec.news seasons your feed"}
      </h1>

      <div className="my-6 border-t border-neutral-100 dark:border-gray-800" />
      <h2 className="font-narrow text-2xl pb-6 text-red-600">
        <Link href={`/${locale}/politics`}>{t.politics}</Link>
      </h2>
      <LazyCategoryFourH
        news={politics}
        withText
        locale={locale}
        theme={theme}
      />

      <div className="my-6 border-t border-neutral-100 dark:border-gray-800" />
      <h2 className="font-narrow text-2xl pb-6 text-red-600">
        <Link href={`/${locale}/economics`}>{t.economics}</Link>
      </h2>
      <LazyCategoryFourH
        news={economics}
        withPhoto
        withText
        locale={locale}
        theme={theme}
      />

      <div className="my-6 border-t border-neutral-100 dark:border-gray-800" />
      <h2 className="font-narrow text-2xl pb-6 text-red-600">
        <Link href={`/${locale}/life`}>{t.life}</Link>
      </h2>
      <LazyCategorySix news={life} locale={locale} theme={theme} />

      <div className="my-6 border-t border-neutral-100 dark:border-gray-800" />
      <h2 className="font-narrow text-2xl pb-6 text-red-600">
        <Link href={`/${locale}/culture`}>{t.culture}</Link>
      </h2>
      <LazyCategorySixV news={culture} locale={locale} theme={theme} />

      <div className="my-6 border-t border-neutral-100 dark:border-gray-800" />
      <h2 className="font-narrow text-2xl pb-6 text-red-600">
        <Link href={`/${locale}/media`}>{t.media}</Link>
      </h2>
      <LazyCategoryMediaFour
        news={media}
        withPhoto
        locale={locale}
        theme={theme}
      />
    </>
  );
}

// "use client";

// import { useTranslations } from "next-intl";
// import { useLocale } from "next-intl";
// import Link from "next/link";
// import { useState, useMemo } from "react";
// // import MainLayout from "./mainLayout";
// import LazyCategorySection from "@/components/lazyCategorySection";

// export default function ClientHome({ initialNews, mainNews, theme }) {
//   const locale = useLocale();
//   const [news] = useState(initialNews);

//   const t = useTranslations("categoryName");

//   const mainNewsIds = useMemo(() => mainNews.map((n) => n._id), [mainNews]);

//   const politics = useMemo(
//     () =>
//       news
//         .filter(
//           (item) =>
//             item.category === "politics" && !mainNewsIds.includes(item._id)
//         )
//         .slice(0, 4),
//     [news, mainNewsIds]
//   );

//   const economics = useMemo(
//     () =>
//       news
//         .filter(
//           (item) =>
//             item.category === "economics" && !mainNewsIds.includes(item._id)
//         )
//         .slice(0, 4),
//     [news, mainNewsIds]
//   );

//   const life = useMemo(
//     () =>
//       news
//         .filter(
//           (item) => item.category === "life" && !mainNewsIds.includes(item._id)
//         )
//         .slice(0, 6),
//     [news, mainNewsIds]
//   );

//   const culture = useMemo(
//     () =>
//       news
//         .filter(
//           (item) =>
//             item.category === "culture" && !mainNewsIds.includes(item._id)
//         )
//         .slice(0, 6),
//     [news, mainNewsIds]
//   );

//   const bezkupur = useMemo(
//     () => news.filter((item) => item.category === "bezkupur").slice(0, 2),
//     [news, mainNewsIds]
//   );

//   const media = useMemo(
//     () =>
//       news
//         .filter(
//           (item) => item.category === "media" && !mainNewsIds.includes(item._id)
//         )
//         .slice(0, 4),
//     [news, mainNewsIds]
//   );

//   return (
//     <>
//       <h1 className="sr-only">
//         {locale === "ru"
//           ? "Острые новости, мемы, ирония и безжалостная правда — Perec.news приправляет инфополе"
//           : "Spicy news, memes, irony, and merciless truth — Perec.news seasons your feed"}
//       </h1>

//       {/* <MainLayout
//         news={mainNews}
//         bezkupur={bezkupur}
//         locale={locale}
//         theme={theme}
//       /> */}

//       <div className="my-6 border-t border-neutral-100 dark:border-gray-800"></div>
//       <h2 className="font-narrow text-2xl pb-6  text-red-600">
//         <Link href={`/${locale}/politics`}>{t("politics")}</Link>
//       </h2>
//       <LazyCategorySection
//         importComponent={() => import("./categoryLayoutFourH")}
//         props={{ news: politics, withText: true, locale, theme }}
//       />

//       <div className="my-6 border-t border-neutral-100 dark:border-gray-800"></div>
//       <h2 className="font-narrow text-2xl pb-6 text-red-600">
//         <Link href={`/${locale}/economics`}>{t("economics")}</Link>
//       </h2>
//       <LazyCategorySection
//         importComponent={() => import("./categoryLayoutFourH")}
//         props={{
//           news: economics,
//           withPhoto: true,
//           withText: true,
//           locale,
//           theme,
//         }}
//       />

//       <div className="my-6 border-t border-neutral-100 dark:border-gray-800"></div>
//       <h2 className="font-narrow text-2xl pb-6 text-red-600">
//         <Link href={`/${locale}/life`}>{t("life")}</Link>
//       </h2>
//       <LazyCategorySection
//         importComponent={() => import("./categoryLayoutSix")}
//         props={{ news: life, locale, theme }}
//       />

//       <div className="my-6 border-t border-neutral-100 dark:border-gray-800"></div>
//       <h2 className="font-narrow text-2xl pb-6 text-red-600">
//         <Link href={`/${locale}/culture`}>{t("culture")}</Link>
//       </h2>
//       <LazyCategorySection
//         importComponent={() => import("./categoryLayoutSixV")}
//         props={{ news: culture, locale, theme }}
//       />

//       <div className="my-6 border-t border-neutral-100 dark:border-gray-800"></div>
//       <h2 className="font-narrow text-2xl pb-6 text-red-600">
//         <Link href={`/${locale}/media`}>{t("media")}</Link>
//       </h2>
//       <LazyCategorySection
//         importComponent={() => import("./categoryLayoutMediaFour")}
//         props={{ news: media, withPhoto: true, locale, theme }}
//       />
//     </>
//   );
// }
