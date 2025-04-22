import { NewsLayout } from "./newsLayout";
import TelegramBanner from "./telegramBanner";

export default function MainLayout({ news, bezkupur, locale }) {
  if (!news?.length) return <p>Нет новостей</p>;

  const col1 = news.slice(0, 2);
  const col2 = news[2];
  const col3 = news.slice(3, 5);
  const col4 = bezkupur;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[0.9fr_1.5fr_1fr_1fr] lg:divide-x divide-neutral-100">
      {/* Колонка 1 */}
      <div className="order-2 sm:order-1 md:space-y-6 md:divide-y pr-4 pb-8 border-neutral-100 md:border-r lg:border-r-0 divide-neutral-100 mt-4 md:mt-0">
        {(col1 ?? []).map((item, index) => (
          <div key={item._id} className={index > 0 ? "pt-5" : ""}>
            <NewsLayout news={item} withText maincat line={3} locale={locale} />
          </div>
        ))}
      </div>

      {/* Главная новость */}
      <div className="order-1 sm:order-2 md:pl-4 md:pr-4 lg:px-4 pb-6 lg:pb-0 border-neutral-100 bg-stone-50 px-4 md:px-0 -mx-4 md:-mx-0 pt-4 lg:pt-0">
        {col2 && (
          <NewsLayout
            news={col2}
            main
            withPhoto
            withText
            maincat
            priority={true}
            locale={locale}
          />
        )}
      </div>

      {/* Колонка 3 */}
      <div className="md:mt-6 lg:mt-0 order-3 space-y-8 md:pr-4 lg:px-4 pb-6 md:pb-0 border-neutral-100 md:border-r lg:border-r-0 divide-neutral-100">
        {(col3 ?? []).map((item, index) => (
          <NewsLayout
            key={item._id}
            news={item}
            withPhoto
            maincat
            locale={locale}
          />
        ))}
      </div>

      {/* Колонка 4 */}
      <div className="md:mt-6 lg:mt-0 order-4 md:space-y-6 md:pl-4 space-y-6">
        <div className=" bg-stone-50 p-4 rounded-xl space-y-4 ">
          {(col4 ?? []).map((item, index) => (
            <div
              key={item._id}
              className="news-h2-light first:border-b first:pb-6 border-neutral-200/40"
            >
              <NewsLayout news={item} maincat locale={locale} />
            </div>
          ))}
        </div>
        <div className=" mt-6">
          <TelegramBanner />
        </div>
      </div>
    </section>
  );
}
