import Link from "next/link";
import Image from "next/image";

const categoryTitles = {
  politics: "Политический перчик",
  economics: "Экономика с огоньком",
  life: "Жизнь острая как чили",
  culture: "Поп-культура в перце",
  bezkupur: "Без купюр",
};

export const NewsLayout = ({
  news,
  main,
  withPhoto,
  withText,
  maincat,
  culture,
  priority = false, // ← по умолчанию false
  line = 2,
}) => {
  const clampClass = {
    2: "line-clamp-2",
    3: "line-clamp-3",
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
              height={200}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              className={`${
                main
                  ? " aspect-[3/2] lg:aspect-[4/3]"
                  : `aspect-[3/2] h-60 ${
                      culture
                        ? "md:h-60 lg:h-72 xl:h-96"
                        : "md:h-56 lg:h-32 xl:h-44"
                    } `
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
            main ? " text-2xl lg:text-3xl" : "text-2xl"
          }  font-narrow font-bold leading-tight `}
        >
          {news?.title}
        </h2>
      </Link>
      {withText && (
        <Link href={`${news.category}/${news.slug}`}>
          <div
            className={`${
              main ? " line-clamp-3 lg:line-clamp-3" : ""
            } text-lg font-light text-neutral-800 mt-3 ${clampClass[line]}`}
            dangerouslySetInnerHTML={{ __html: news.content }}
          ></div>
        </Link>
      )}
      {maincat && (
        <div className=" font-narrow text-perecred pt-2">
          <span className="">{categoryTitles[news.category]}</span>
        </div>
      )}
    </article>
  );
};
