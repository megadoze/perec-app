"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

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

  const t = news.translations[locale] || {};
  if (!t) return null;

  return (
    <article>
      {withPhoto && news?.images && (
        <Link href={`/${locale}/${news.category}/${t.slug}`}>
          <div className="overflow-hidden mb-2">
            <Image
              src={news?.images[0]}
              alt={t.title || ""}
              width={320}
              height={200}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              className={`${
                main
                  ? " aspect-[3/2] lg:aspect-[4/3]"
                  : maincat
                  ? "md:h-56 lg:h-32 xl:h-44"
                  : `${
                      culture
                        ? "md:h-60 lg:h-72 xl:h-96"
                        : "md:h-56 lg:h-36 xl:h-52"
                    } `
              } w-full h-full object-cover hover:opacity-90`}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMyMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlZWUiIC8+PC9zdmc+"
            />
          </div>
        </Link>
      )}

      <Link href={`/${locale}/${news.category}/${t.slug}`}>
        <h2
          className={`${
            main ? " text-2xl lg:text-3xl" : "text-2xl"
          }  font-narrow font-bold leading-tight `}
        >
          {t.title}
        </h2>
      </Link>

      {withText && (
        <Link href={`/${locale}/${news.category}/${t.slug}`}>
          <div
            className={`${
              main ? " line-clamp-3 lg:line-clamp-3" : "pt-0"
            } text-lg font-light text-black ${clampClass[line]}`}
            dangerouslySetInnerHTML={{ __html: t.content || "" }}
          ></div>
        </Link>
      )}

      {maincat && (
        <div className=" font-narrow text-red-600 pt-2">
          <span>{tCat(news.category)}</span>
        </div>
      )}
    </article>
  );
};
