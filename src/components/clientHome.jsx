"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import MainLayout from "./mainLayout";

import dynamic from "next/dynamic";

const CategoryLayoutFourH = dynamic(() => import("./categoryLayoutFourH"), {
  loading: () => <p className="text-sm text-neutral-400">Загрузка блока...</p>,
  ssr: false,
});

const CategoryLayoutFourV = dynamic(() => import("./categoryLayoutFourV"), {
  loading: () => <p className="text-sm text-neutral-400">Загрузка блока...</p>,
  ssr: false,
});

const CategoryLayoutSix = dynamic(() => import("./categoryLayoutSix"), {
  loading: () => <p className="text-sm text-neutral-400">Загрузка блока...</p>,
  ssr: false,
});

export default function ClientHome({ initialNews }) {
  const [news] = useState(initialNews);

  const mainNewsIds = useMemo(() => news.slice(0, 7).map((n) => n.id), [news]);

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
        .slice(0, 4),
    [news, mainNewsIds]
  );

  return (
    <>
      <MainLayout news={news} />
      <div className="my-6 border-t border-neutral-200"></div>
      <h2 className="font-narrow text-2xl pb-6  text-perecred">
        <Link href="politics">Политический перчик</Link>
        {/* <span className=" h-20 w-20 bg-red-600 p-3">P</span>
        <span className=" h-2 w-2 bg-[#d41d1d] p-3">P</span> */}
      </h2>
      <CategoryLayoutFourH news={politics} withText />

      <div className="my-6 border-t border-neutral-200"></div>
      <h2 className="font-narrow text-2xl pb-6 text-perecred">
        <Link href="economics"> Экономика с огоньком</Link>
      </h2>
      <CategoryLayoutFourH news={economics} withPhoto withText />
      <div className="my-6 border-t border-neutral-200"></div>
      <h2 className="font-narrow text-2xl pb-6 text-perecred">
        <Link href="life">Жизнь острая как чили</Link>
      </h2>
      <CategoryLayoutSix news={life} />

      <div className="my-6 border-t border-neutral-200"></div>
      <h2 className="font-narrow text-2xl pb-6 text-perecred">
        <Link href="culture">Поп-культура в перце</Link>
      </h2>
      <CategoryLayoutFourV news={culture} />
    </>
  );
}
