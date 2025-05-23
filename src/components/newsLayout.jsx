import Link from "next/link";
import Image from "next/image";

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
  categoryName,
}) => {
  if (!news?.translations?.[locale]) return null;

  const t = news.translations[locale];
  const clampClass = {
    2: "line-clamp-2",
    3: "line-clamp-3",
  };

  const imageUrl = news?.images?.[0]?.url || "";

  const svg = `<svg width="320" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="200" fill="rgba(80,80,80,0.1)" /></svg>`;
  const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(svg).toString(
    "base64"
  )}`;

  return (
    <article>
      {withPhoto && news?.images && (
        <Link href={`/${locale}/${news.category}/${t.slug}`}>
          <Image
            src={imageUrl}
            alt={t.title || ""}
            width={320}
            height={240}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            fetchPriority={priority ? "high" : "low"}
            decoding="async"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className={`${
              main
                ? "h-72 md:h-60 xl:h-80"
                : maincat
                ? "h-72 md:h-60 lg:h-40 xl:h-48"
                : `${
                    culture
                      ? "aspect-[4/3]"
                      : "h-64 md:h-56 lg:h-36 xl:h-52"
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
        <div className="font-narrow text-red-600 dark:text-red-500 pt-2">
          <span>{categoryName}</span>
        </div>
      )}
    </article>
  );
};
