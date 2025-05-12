"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useState, useMemo } from "react";
import MainLayout from "./mainLayout";

import dynamic from "next/dynamic";
import CategoryLayoutMediaFour from "./categoryLayoutMediaFour";

const CategoryLayoutFourH = dynamic(() => import("./categoryLayoutFourH"), {
  loading: () => <p className="text-sm text-neutral-400">Loading...</p>,
  ssr: false,
});

const CategoryLayoutSixV = dynamic(() => import("./categoryLayoutSixV"), {
  loading: () => <p className="text-sm text-neutral-400">Loading...</p>,
  ssr: false,
});

const CategoryLayoutSix = dynamic(() => import("./categoryLayoutSix"), {
  loading: () => <p className="text-sm text-neutral-400">Loading...</p>,
  ssr: false,
});

export default function ClientHome({ initialNews, mainNews, theme }) {
  const locale = useLocale();
  const [news] = useState(initialNews);

  const t = useTranslations("categoryName");

  const mainNewsIds = useMemo(() => mainNews.map((n) => n._id), [mainNews]);

  // Категории без дублирования с главной
  const politics = useMemo(
    () =>
      news
        .filter(
          (item) =>
            item.category === "politics" && !mainNewsIds.includes(item._id)
        )
        .slice(0, 4),
    [news, mainNewsIds]
  );

  const economics = useMemo(
    () =>
      news
        .filter(
          (item) =>
            item.category === "economics" && !mainNewsIds.includes(item._id)
        )
        .slice(0, 4),
    [news, mainNewsIds]
  );

  const life = useMemo(
    () =>
      news
        .filter(
          (item) => item.category === "life" && !mainNewsIds.includes(item._id)
        )
        .slice(0, 6),
    [news, mainNewsIds]
  );

  const culture = useMemo(
    () =>
      news
        .filter(
          (item) =>
            item.category === "culture" && !mainNewsIds.includes(item._id)
        )
        .slice(0, 6),
    [news, mainNewsIds]
  );

  const bezkupur = useMemo(
    () => news.filter((item) => item.category === "bezkupur").slice(0, 2),
    [news, mainNewsIds]
  );

  // const media = useMemo(
  //   () =>
  //     news
  //       .filter(
  //         (item) => item.category === "media" && !mainNewsIds.includes(item._id)
  //       )
  //       .slice(0, 4),
  //   [news, mainNewsIds]
  // );
  const filterMedia = news.filter((i) => i.category === "media");
  const media = Array(4).fill(filterMedia[0]);
  // console.log(media);

  return (
    <>
      <MainLayout
        news={mainNews}
        bezkupur={bezkupur}
        locale={locale}
        theme={theme}
      />
      <div className="my-6 border-t border-neutral-100 dark:border-gray-800"></div>
      <h2 className="font-narrow text-2xl pb-6  text-red-600">
        <Link href={`/${locale}/politics`}>{t("politics")}</Link>
      </h2>
      <CategoryLayoutFourH
        news={politics}
        withText
        locale={locale}
        theme={theme}
      />
      <div className="my-6 border-t border-neutral-100 dark:border-gray-800"></div>
      <h2 className="font-narrow text-2xl pb-6 text-red-600">
        <Link href={`/${locale}/economics`}>{t("economics")}</Link>
      </h2>
      <CategoryLayoutFourH
        news={economics}
        withPhoto
        withText
        locale={locale}
        theme={theme}
      />
      <div className="my-6 border-t border-neutral-100 dark:border-gray-800"></div>
      <h2 className="font-narrow text-2xl pb-6 text-red-600">
        <Link href={`/${locale}/life`}>{t("life")}</Link>
      </h2>
      <CategoryLayoutSix news={life} locale={locale} theme={theme} />

      <div className="my-6 border-t border-neutral-100 dark:border-gray-800"></div>
      <h2 className="font-narrow text-2xl pb-6 text-red-600">
        <Link href={`/${locale}/culture`}>{t("culture")}</Link>
      </h2>
      <CategoryLayoutSixV news={culture} locale={locale} theme={theme} />

      {/* <div className="my-6 border-t border-neutral-100 dark:border-gray-800"></div>
      <h2 className="font-narrow text-2xl pb-6 text-red-600">
        <Link href={`/${locale}/media`}>{t("media")}</Link>
      </h2>
      <CategoryLayoutMediaFour
        news={media}
        withPhoto
        locale={locale}
        theme={theme}
      /> */}
    </>
  );
}
