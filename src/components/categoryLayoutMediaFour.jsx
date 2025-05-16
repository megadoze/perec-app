import Link from "next/link";
import VideoWithIcon from "./videoWithIcon";

export default function CategoryLayoutMediaFour({
  news,
  withPhoto,
  locale,
  firstNewId,
  firstItemRef,
}) {
  const emptyNews = {
    ru: "Нет новостей",
    en: "No news",
  };

  if (!news?.length) return <p>{emptyNews[locale]}</p>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {news.map((item, idx) => {
        const imageUrl = item.images[0].url || "";
        const isVideo = item.images[0].type === "video";
        const posterUrl = item.images[0].poster;

        const title = item.translations?.[locale]?.title || "Без заголовка";

        return (
          <div
            key={item._id + idx}
            ref={item._id === firstNewId ? firstItemRef : null}
          >
            <article className="relative">
              {withPhoto &&
                imageUrl &&
                (isVideo ? (
                  <VideoWithIcon
                    imageUrl={imageUrl}
                    news={item}
                    posterUrl={posterUrl}
                    locale={locale}
                  />
                ) : (
                  <Link
                    href={`/${locale}/media/${item.translations[locale].slug}`}
                  >
                    <div className="relative w-full">
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-full aspect-[9/16] md:h-[500px] object-cover"
                      />
                      <div
                        className="absolute bottom-4 left-4 right-4 bg-gray-900/40 px-4 py-2 rounded-sm"
                        style={{ display: "flex" }}
                      >
                        <h2 className="text-2xl font-narrow tracking-wide text-white">
                          {item.translations[locale].title}
                        </h2>
                      </div>
                    </div>
                  </Link>
                ))}
            </article>
          </div>
        );
      })}
    </section>
  );
}