import { NewsLayout } from "./newsLayout";

export default function CategoryLayoutSixV({ news, locale }) {
  if (!news?.length) return <p>Нет новостей</p>;

  const col1 = news.slice(0, 1);
  const col2 = news.slice(1, 4);
  const col3 = news.slice(4, 6);
  // const col4 = news.slice(4, 6);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1.2fr_1fr] lg:divide-x divide-neutral-100">
      {/* Колонка 1 */}
      <div className="  md:pr-4 pb-6 lg:pb-0 md:border-r lg:border-r-0">
        {col1.map((item, index) => (
          <div key={item.id} className={`${index > 0 && "pt-5"}`}>
            <NewsLayout
              news={item}
              withText
              withPhoto
              lineClamp={2}
              culture
              locale={locale}
            />
          </div>
        ))}
      </div>
      {/* Колонка 2 */}
      {col2.length > 0 && (
        <div className=" md:space-y-6 lg:px-4 md:pl-4 pb-6 md:pb-0 lg:pb-0 lg:border-r border-neutral-100 md:divide-y divide-neutral-100">
          {col2.map((item, index) => (
            <div key={item.id} className={`${index > 0 && "pt-5"}`}>
              <NewsLayout news={item} withText lineClamp={2} locale={locale} />
            </div>
          ))}
        </div>
      )}
      {/* Колонка 3 */}
      {col3.length > 0 && (
        <div className=" space-y-6 md:space-y-0 lg:space-y-0 xl:space-y-6 md:pt-6 lg:pt-0 md:grid md:grid-cols-2 lg:grid-cols-none md:col-span-full lg:col-span-1 lg:pl-4 md:pb-0 divide-neutral-100 md:divide-x lg:divide-none">
          {col3.map((item, index) => (
            <div
              key={item.id}
              className={`${index > 0 ? "md:pl-4 lg:pl-0" : "md:pr-4 lg:pr-0"}`}
            >
              <NewsLayout news={item} withPhoto lineClamp={2} locale={locale} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
