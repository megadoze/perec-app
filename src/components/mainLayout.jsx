import { NewsLayout } from "./newsLayout";
// import PodcastBlock from "./podcastBlock";
import TelegramBanner from "./telegramBanner";

export default function MainLayout({ news, bezkupur, locale, theme, t }) {
  if (!news?.length) return <p>Нет новостей</p>;

  const col1 = news.slice(0, 2);
  const col2 = news[2];
  const col3 = news.slice(3, 5);
  const col4 = bezkupur;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[0.9fr_1.5fr_1fr_1fr] lg:divide-x divide-neutral-100 dark:divide-gray-800/60">
      {/* Главная новость */}
      <div className="order-1 md:order-2 md:pl-4 md:pr-4 lg:px-4 pb-4 border-neutral-100 bg-neutral-100/80  dark:border-gray-800  dark:bg-gray-800/60 px-4 md:px-0 -mx-4 md:-mx-0 pt-4">
        {col2 && (
          <NewsLayout
            news={col2}
            main
            withPhoto
            withText
            maincat
            priority={true}
            locale={locale}
            theme={theme}
            categoryName={t[col2.category]}
          />
        )}
      </div>

      {/* Колонка 1 */}
      <div className="order-2 md:order-1 md:space-y-6 md:divide-y pr-4 pb-8 border-neutral-100 dark:border-gray-800 md:border-r lg:border-none divide-neutral-100 dark:divide-gray-800 mt-4 md:mt-0">
        {(col1 ?? []).map((item, index) => (
          <div key={item._id} className={index > 0 ? "pt-5" : ""}>
            <NewsLayout
              news={item}
              withText
              maincat
              line={3}
              locale={locale}
              theme={theme}
              categoryName={t[item.category]}
            />
          </div>
        ))}
      </div>

      {/* Колонка 3 */}
      <div className="md:mt-6 lg:mt-0 order-3 space-y-7 md:pr-4 lg:px-4 pb-6 md:pb-4 lg:pt-4 lg:bg-stone-100/40 lg:dark:bg-gray-800/40  md:border-r lg:border-r-0  divide-neutral-100 border-neutral-100 dark:divide-gray-800">
        {(col3 ?? []).map((item, index) => (
          <NewsLayout
            key={item._id}
            news={item}
            withPhoto
            maincat
            locale={locale}
            theme={theme}
            categoryName={t[item.category]}
          />
        ))}
      </div>

      {/* Колонка 4 */}
      <div className="md:mt-6 lg:mt-0 order-4 md:space-y-6 md:pl-4 space-y-6">
        <div className=" bg-neutral-50 dark:bg-gray-900 px-4 py-3 space-y-4 divide-y">
          {(col4 ?? []).map((item, index) => (
            <div
              key={item._id}
              className="news-h2-light first:pt-0 pt-4 border-neutral-200/40 dark:border-gray-800"
            >
              <NewsLayout
                news={item}
                maincat
                locale={locale}
                theme={theme}
                categoryName={t[item.category]}
              />
            </div>
          ))}
        </div>
        {/* <PodcastBlock /> */}
        <div className=" mt-6">
          <TelegramBanner />
        </div>
      </div>
    </section>
  );
}
