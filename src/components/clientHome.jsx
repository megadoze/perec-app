"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { useState, useMemo } from "react";
import MainLayout from "./mainLayout";

import dynamic from "next/dynamic";

const CategoryLayoutFourH = dynamic(() => import("./categoryLayoutFourH"), {
  loading: () => <p className="text-sm text-neutral-400">Загрузка блока...</p>,
  ssr: false,
});

const CategoryLayoutSixV = dynamic(() => import("./categoryLayoutSixV"), {
  loading: () => <p className="text-sm text-neutral-400">Загрузка блока...</p>,
  ssr: false,
});

const CategoryLayoutSix = dynamic(() => import("./categoryLayoutSix"), {
  loading: () => <p className="text-sm text-neutral-400">Загрузка блока...</p>,
  ssr: false,
});

export default function ClientHome({ initialNews }) {
  const locale = useLocale();
  const [news] = useState(initialNews);

  const mainNewsIds = useMemo(() => news.slice(0, 7).map((n) => n.id), [news]);

  const mainNews = news.filter((item) => item.category !== "bezkupur");

  // Категории без дублирования с главной
  const politics = useMemo(
    () =>
      news
        .filter(
          (item) =>
            item.category === "politics" && !mainNewsIds.includes(item.id)
        )
        .slice(0, 4),
    [news, mainNewsIds]
  );

  const economics = useMemo(
    () =>
      news
        .filter(
          (item) =>
            item.category === "economics" && !mainNewsIds.includes(item.id)
        )
        .slice(0, 4),
    [news, mainNewsIds]
  );

  const life = useMemo(
    () =>
      news
        .filter(
          (item) => item.category === "life" && !mainNewsIds.includes(item.id)
        )
        .slice(0, 6),
    [news, mainNewsIds]
  );

  const culture = useMemo(
    () =>
      news
        .filter(
          (item) =>
            item.category === "culture" && !mainNewsIds.includes(item.id)
        )
        .slice(0, 6),
    [news, mainNewsIds]
  );

  const bezkupur = useMemo(
    () => news.filter((item) => item.category === "bezkupur").slice(0, 2),
    [news, mainNewsIds]
  );

  return (
    <>
      <MainLayout news={mainNews} bezkupur={bezkupur} locale={locale} />
      <div className="my-6 border-t border-neutral-100"></div>
      <h2 className="font-narrow text-2xl pb-6  text-red-600">
        <Link href={`/${locale}/politics`}>Политический перчик</Link>
      </h2>
      <CategoryLayoutFourH news={politics} withText locale={locale} />
      <div className="my-6 border-t border-neutral-100"></div>
      <h2 className="font-narrow text-2xl pb-6 text-red-600">
        <Link href={`/${locale}/economics`}>Экономика с огоньком</Link>
      </h2>
      <CategoryLayoutFourH
        news={economics}
        withPhoto
        withText
        locale={locale}
      />
      <div className="my-6 border-t border-neutral-100"></div>
      <h2 className="font-narrow text-2xl pb-6 text-red-600">
        <Link href={`/${locale}/life`}>Жизнь острая как чили</Link>
      </h2>
      <CategoryLayoutSix news={life} locale={locale} />

      <div className="my-6 border-t border-neutral-100"></div>
      <h2 className="font-narrow text-2xl pb-6 text-red-600">
        <Link href={`/${locale}/culture`}>Поп-культура в перце</Link>
      </h2>
      <CategoryLayoutSixV news={culture} locale={locale} />
    </>
  );
}
