import Link from "next/link";
import Image from "next/image";

export const NewsLayout = ({
  news,
  main,
  withPhoto,
  withText,
  maincat,
  priority = false, // ← по умолчанию false
  line = 2,
}) => {
  const clampClass = {
    2: "line-clamp-2",
    3: "line-clamp-3",
    4: "line-clamp-4",
  };

  return (
    <article>
      {withPhoto && news?.images && (
        <Link href={`${news.category}/${news.slug}`}>
          <div className="overflow-hidden mb-2">
            <Image
              src={news?.images[0]}
              alt={news.title}
              width={320}
              height={main ? 240 : 200}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              className={`${
                main
                  ? "aspect-[4/3]"
                  : "aspect-[3/2] h-60 md:h-56 lg:h-36 xl:h-48"
              } w-full h-full object-cover hover:opacity-90`}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMyMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlZWUiIC8+PC9zdmc+"
            />
          </div>
        </Link>
      )}
      <Link href={`${news.category}/${news.slug}`}>
        <h2
          className={`${
            main ? "text-3xl" : "text-2xl"
          } font-bold font-narrow leading-tight`}
        >
          {news?.title}
        </h2>
      </Link>
      {withText && (
        <div
          className={`${
            main ? "lg:line-clamp-6" : ""
          } text-lg font-light text-neutral-800 mt-3 ${clampClass[line]}`}
          dangerouslySetInnerHTML={{ __html: news.content }}
        ></div>
      )}
      {maincat && (
        <div className="text-sm text-orange-700/80 pt-3">
          <span className="">{news.category}</span>
        </div>
      )}
    </article>
  );
};
