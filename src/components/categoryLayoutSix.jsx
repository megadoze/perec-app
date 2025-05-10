import { NewsLayout } from "./newsLayout";

export default function CategoryLayoutSix({ news, locale, theme }) {
  const emptyNews = {
    ru: "Нет новостей",
    en: "No news",
  };

  if (!news?.length) return <p>{emptyNews[locale]}</p>;

  const col1 = news.slice(0, 1);
  const col2 = news.slice(1, 3);
  const col3 = news.slice(3, 4);
  const col4 = news.slice(4, 6);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x divide-neutral-100 dark:divide-gray-800">
      {/* Колонка 1 */}
      <div className=" md:space-y-6 md:divide-y md:pr-4 pb-6 lg:pb-0 border-neutral-100 dark:border-gray-800 md:border-r lg:border-r-0 divide-neutral-100 dark:divide-gray-800">
        {col1.map((item, index) => (
          <div key={item._id} className={`${index > 0 && "pt-5"}`}>
            <NewsLayout
              news={item}
              withText
              withPhoto
              lineClamp={2}
              locale={locale}
              theme={theme}
            />
          </div>
        ))}
      </div>

      {/* Колонка 2 */}
      <div className=" md:space-y-6 md:pl-4 lg:pr-4 pb-6 lg:pb-0 border-neutral-100 dark:border-gray-800 md:divide-y divide-neutral-100 dark:divide-gray-800">
        {col2.map((item, index) => (
          <div key={item._id} className={`${index > 0 && "pt-5"}`}>
            <NewsLayout
              news={item}
              withText
              lineClamp={2}
              locale={locale}
              theme={theme}
            />
          </div>
        ))}
      </div>

      {/* Колонка 3 */}
      <div className=" space-y-8 md:pr-4 lg:px-4 pb-6 md:pb-0 lg:pb-0 border-neutral-100 dark:border-gray-800 md:border-r lg:border-r-0 divide-neutral-100 dark:divide-gray-800">
        {col3.map((item, index) => (
          <div key={item._id} className={`${index > 0 && "pt-5"}`}>
            <NewsLayout
              news={item}
              withText
              withPhoto
              lineClamp={2}
              locale={locale}
              theme={theme}
            />
          </div>
        ))}
      </div>

      {/* Колонка 4 */}
      <div className=" md:space-y-6 md:pl-4 border-neutral-100 dark:border-gray-800 md:divide-y divide-neutral-100 dark:divide-gray-800">
        {col4.map((item, index) => (
          <div key={item._id} className={`${index > 0 && "pt-5"}`}>
            <NewsLayout
              news={item}
              withText
              lineClamp={2}
              locale={locale}
              theme={theme}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
