"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
// import Head from "next/head";

export const NewsLayout = ({
  news,
  main,
  withPhoto,
  withText,
  maincat,
  culture,
  priority = false,
  line = 2,
  locale,
  theme,
}) => {
  const tCat = useTranslations("categoryName");

  if (!news) {
    console.warn("❌ Пустая новость:", news);
    return null;
  }

  if (!news?.translations?.[locale]) {
    console.warn("❌ Ошибка: новость без перевода", news);
    return null;
  }

  const clampClass = {
    2: "line-clamp-2",
    3: "line-clamp-3",
  };

  const t = news.translations[locale];

  const imageUrl = news?.images?.[0]?.url || "";
  // const proxiedUrl = `/api/image?path=${encodeURIComponent(imageUrl)}`;

  if (!t) return null;

  // function removeStrongTags(html) {
  //   return html.replace(/<\/?strong>/gi, "");
  // }

  const svg =
    theme === "dark"
      ? `<svg width="320" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="200" fill="rgba(31,41,55,0.4)" /></svg>`
      : `<svg width="320" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="200" fill="rgba(228,228,228,0.4)" /></svg>`;
  const base64 = Buffer.from(svg).toString("base64");
  const blurDataURL = `data:image/svg+xml;base64,${base64}`;

  return (
    <>
      {/* ✅ Добавляем прелоад, если это главная новость */}
      {/* {main && imageUrl && (
        <Head>
          <link
            rel="preload"
            as="image"
            href={proxiedUrl}
            fetchpriority="high"
          />
        </Head>
      )} */}
      {withPhoto && news?.images && (
        <Link href={`/${locale}/${news.category}/${t.slug}`}>
          <Image
            src={imageUrl}
            // src={`/api/image?path=${encodeURIComponent(news?.images[0].url)}`}
            alt={t.title || ""}
            width={320}
            height={240}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            fetchPriority="high"
            decoding="async"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className={`${
              main
                ? "h-64 md:h-56 lg:min-h-60 xl:h-80"
                : maincat
                ? "h-64 md:h-56 lg:h-32 xl:h-44"
                : `${
                    culture
                      ? " aspect-[3/2] md:aspect-[4/3]"
                      : " h-64 md:h-56 lg:h-36 xl:h-52"
                  } `
            } w-full object-cover hover:opacity-90 mb-2`}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </Link>
      )}

      <Link href={`/${locale}/${news.category}/${t.slug}`}>
        <h2
          className={`${
            main
              ? " text-3xl lg:text-4xl"
              : maincat
              ? " text-[26px] lg:text-2xl lg:leading-7"
              : " text-[26px]"
          }  font-narrow font-bold leading-tight`}
        >
          {t.title}
        </h2>
      </Link>

      {withText && (
        <Link href={`/${locale}/${news.category}/${t.slug}`}>
          <div
            className={`${
              main ? " line-clamp-3 lg:line-clamp-4" : "pt-0"
            } pt-4 text-xl font-light ${clampClass[line]}`}
          >
            {t.subTitle || ""}
          </div>
        </Link>
      )}

      {maincat && (
        <div className=" font-narrow text-red-600 pt-2">
          <span>{tCat(news.category)}</span>
        </div>
      )}
    </>
  );
};
