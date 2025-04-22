import Image from "next/image";
import BackButton from "./backButton";
import dayjs from "dayjs";

export default function NewsContent({ data, locale }) {
  const t = data.translations?.[locale] || {};

  const published = {
    ru: "Опубликовано",
    en: "Published",
  };

  const author = {
    ru: "Автор",
    en: "Author",
  };

  return (
    <>
      <article className="max-w-3xl h-fit mx-auto p-0">
        <h1 className="text-3xl font-narrow font-bold mb-2">{t.title}</h1>
        <p className="text-gray-500 text-sm mb-4">
          {published[locale]}:{" "}
          {dayjs(data.publishedAt).format("DD MMM YYYY HH:mm")}
        </p>
        <h2 className="text-xl font-narrow mb-6 md:mb-6">{t.subTitle}</h2>
        <div className="clearfix">
          {data?.images && (
            <div className="relative w-full md:w-[320px] aspect-[3/2] md:float-right md:ml-4 mb-4 md:mb-0">
              <Image
                src={data.images[0]}
                alt={t.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                priority
                className="w-full h-auto object-cover"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMyMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlZWUiIC8+PC9zdmc+"
              />
            </div>
          )}

          <div
            className=" text-lg font-light leading-relaxed clear-none "
            dangerouslySetInnerHTML={{ __html: t.content }}
          ></div>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          {author[locale]}: {data.author}
        </p>
        <BackButton />
      </article>
    </>
  );
}
