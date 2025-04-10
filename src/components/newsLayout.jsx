import Link from "next/link";

export const NewsLayout = ({
  news,
  main,
  withPhoto,
  withText,
  maincat,
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
        <Link href={`/news/${news.id}`}>
          <div className="overflow-hidden mb-2">
            <img
              src={news?.images[0]}
              alt={news.title}
              className={`${
                main
                  ? "aspect-[4/3]"
                  : "aspect-[3/2] h-60 md:h-56 lg:h-36 xl:h-48"
              } w-full h-full object-cover hover:opacity-90`}
            />
          </div>
        </Link>
      )}
      <Link href={`/news/${news.id}`}>
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
