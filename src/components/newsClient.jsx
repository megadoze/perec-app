import { notFound } from "next/navigation";
import Image from "next/image";
import MultiavatarImage from "./multiavatarImage";
import Link from "next/link";
import BackButton from "./backButton";
import PublishedAt from "./publishedAt";
import LazyCategoryFourH from "./lazyCategoryFourH";

export default function NewsContent({
  data,
  locale,
  categoryName,
  news,
  currentAvatar,
}) {
  if (!data || !data.translations || !data.translations[locale]) {
    console.log("❌ [NewsContent] no data or translations for locale:", locale);
    return notFound();
  }

  const t = data.translations[locale];

  if (!t?.title?.trim() || !t?.content?.trim()) {
    console.log("❌ [NewsContent] empty title or content:", t);
    return notFound();
  }

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

  const telegram = {
    ru: {
      title: "🌶️ Хочешь острое первым?",
      description: "Подпишись на наш",
      lead: "острое, честное, без цензуры.",
      follow: "Подписаться",
      link: "https://t.me/perecnews",
    },
    en: {
      title: "🌶️ Want the spiciest first?",
      description: "Subscribe to our",
      lead: "sharp, honest, uncensored.",
      follow: "Subscribe",
      link: "https://t.me/perecnews_en",
    },
  };

  return (
    <>
      <article className="max-w-3xl h-fit mx-auto p-0">
        <h1 className="text-4xl md:text-5xl font-narrow font-bold mb-2">
          {t.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-light text-base mb-4">
          {published[locale]}:{" "}
          <PublishedAt timestamp={data.publishedAt} locale={locale} />
        </p>
        <h2 className="text-2xl font-narrow mb-6 md:mb-6">{t.subTitle}</h2>
        <div className="clearfix block">
          {data?.images && (
            <div className="relative w-full md:w-[320px] aspect-[3/2] md:float-right md:ml-4 mb-4 md:mb-2">
              <Image
                src={data.images[0].url}
                alt={t.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                priority
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          <div
            className=" text-xl font-light leading-relaxed clear-none "
            dangerouslySetInnerHTML={{ __html: t.content }}
          ></div>
        </div>
        <div className=" mt-6">
          <p className="text-2xl font-narrow">{telegram[locale].title}</p>
          <p className="text-lg font-sans text-gray-800 mb-4 mt-4">
            {telegram[locale].description}{" "}
            <a
              href={telegram[locale].link}
              target="_blank"
              className="text-perecred font-bold"
            >
              Telegram →
            </a>{" "}
            {telegram[locale].lead}
          </p>
          <a
            href={telegram[locale].link}
            target="_blank"
            className="inline-block bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition"
          >
            {telegram[locale].follow} →
          </a>
        </div>
        <div className="w-full pt-8 flex flex-wrap justify-between items-end text-base text-gray-800">
          <div className="order-2 md:order-1 flex w-full md:w-auto gap-3 items-center">
            {currentAvatar && (
              <div>
                <MultiavatarImage avatarId={currentAvatar} size={48} />
              </div>
            )}
            <div>
              <p className="m-0 font-narrow text-lg dark:text-gray-300">
                {data?.satire?.author || data.user.name}
              </p>
              <p className="m-0 text-gray-400 font-light text-base">
                {author[locale]}
              </p>
            </div>
          </div>
          {data.source.name && (
            <div className=" order-1 md:order-2 mb-5 md:mb-0  flex items-center text-lg">
              <p className=" font-light pr-1">{source[locale]}</p>
              <a href={data.source.link} target="_blank">
                <p> {data.source.label}</p>
              </a>
            </div>
          )}
        </div>
        <BackButton />
      </article>
      <div className="my-8 border-t border-neutral-100 dark:border-gray-800"></div>
      <Link href={`/${locale}/${data.category}`}>
        <h3 className=" font-narrow font-normal text-2xl mb-5">
          {moreNews[locale]}{" "}
          <span className=" text-red-600">{categoryName}</span>
        </h3>
      </Link>
      <LazyCategoryFourH news={news} withPhoto withText locale={locale} />
    </>
  );
}
