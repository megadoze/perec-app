import { notFound } from "next/navigation";
import Image from "next/image";
import BackButton from "./backButton";
import CategoryLayoutFourH from "./categoryLayoutFourH";
import { db, ref, get, child } from "@/lib/firebase";
import MultiavatarImage from "./multiavatarImage";
import Link from "next/link";
import PublishedAt from "./publishedAt";

export default async function NewsContent({ data, locale }) {
  if (!data || !data.translations || !data.translations[locale]) {
    return notFound();
  }

  const t = data.translations[locale];

  if (!t.title?.trim() || !t.content?.trim()) {
    return notFound();
  }

  const category = data.category;

  const messages = (await import(`@/lang/${locale}/common.json`)).default;
  const categoryName = messages.categoryName?.[category];

  const newsSnapshot = await get(child(ref(db), "news"));
  const authorsSnapshot = await get(child(ref(db), "authors"));

  const newsData = newsSnapshot.exists() ? newsSnapshot.val() : {};
  const authorsData = authorsSnapshot.exists() ? authorsSnapshot.val() : {};

  const news = Object.entries(newsData)
    .map(([id, item]) => ({ _id: id, ...item }))
    .filter((item) => {
      const t = item.translations?.[locale];
      return (
        item.status === "published" &&
        item.category === category &&
        item._id !== data._id &&
        t?.title?.trim() &&
        t?.content?.trim()
      );
    })
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .slice(0, 4);

  const authors = Object.values(authorsData);

  const currentAvatar =
    data?.satire?.author !== ""
      ? authors.find((a) => a.style === data?.satire?.style).avatar
      : data.user.avatar;

  const moreNews = {
    ru: "Еще",
    en: "More",
  };

  const published = {
    ru: "Опубликовано",
    en: "Published",
  };

  const author = {
    ru: "Автор",
    en: "Author",
  };

  const source = {
    ru: "По материалам",
    en: "Based on materials from",
  };

  return (
    <>
      <article className="max-w-3xl h-fit mx-auto p-0">
        <h1 className="text-3xl font-narrow font-bold mb-2">{t.title}</h1>
        <p className="text-gray-500 font-light text-sm mb-4">
          {published[locale]}: <PublishedAt timestamp={data.publishedAt} />
        </p>
        <h2 className="text-xl font-narrow mb-6 md:mb-6">{t.subTitle}</h2>
        <div className="clearfix block">
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
        <div className="w-full pt-8 flex flex-wrap justify-between items-end text-base text-gray-800">
          <div className="order-2 md:order-1 flex w-full md:w-auto gap-3 items-center">
            {currentAvatar && (
              <div>
                <MultiavatarImage avatarId={currentAvatar} size={48} />
              </div>
            )}
            <div>
              <p className="m-0 font-narrow">
                {" "}
                {data?.satire?.author || data.user.name}
              </p>
              <p className="m-0 text-gray-500 font-light text-sm">
                {author[locale]}
              </p>
            </div>
          </div>
          {data.source.name && (
            <div className=" order-1 md:order-2 mb-5 md:mb-0  flex items-center">
              <p className=" font-light pr-1">{source[locale]}</p>
              <a href={data.source.link} target="_blank">
                <p> {data.source.label}</p>
              </a>
            </div>
          )}
        </div>
        <BackButton />
      </article>
      <div className="my-8 border-t border-neutral-100"></div>
      <Link href={`/${locale}/${category}`}>
        <h3 className=" font-narrow text-2xl mb-5">
          {moreNews[locale]}{" "}
          <span className=" text-red-600">{categoryName}</span>
        </h3>
      </Link>
      <CategoryLayoutFourH news={news} withPhoto withText locale={locale} />
    </>
  );
}
