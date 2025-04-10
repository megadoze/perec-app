import { NewsLayout } from "./newsLayout";

export default function CategoryLayoutSix({ news }) {
  if (!news?.length) return <p>Нет новостей</p>;

  const col1 = news.slice(0, 1);
  const col2 = news.slice(1, 3);
  const col3 = news.slice(3, 4);
  const col4 = news.slice(4, 6);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x divide-neutral-200">
      {/* Колонка 1 */}
      <div className=" md:space-y-6 md:divide-y md:pr-4 pb-6 lg:pb-0 border-neutral-200 md:border-r lg:border-r-0 divide-neutral-200">
        {col1.map((item, index) => (
          <div key={item.id} className={`${index > 0 && "pt-5"}`}>
            <NewsLayout news={item} withText withPhoto lineClamp={2} />
          </div>
        ))}
      </div>

      {/* Колонка 2 */}
      <div className=" md:space-y-6 md:pl-4 lg:pr-4 pb-6 lg:pb-0 border-neutral-200 md:divide-y divide-neutral-200">
        {col2.map((item, index) => (
          <div key={item.id} className={`${index > 0 && "pt-5"}`}>
            <NewsLayout news={item} withText lineClamp={2} />
          </div>
        ))}
      </div>

      {/* Колонка 3 */}
      <div className=" space-y-8 md:pr-4 lg:px-4 pb-6 md:pb-0 lg:pb-0 border-neutral-200 md:border-r lg:border-r-0 divide-neutral-200">
        {col3.map((item, index) => (
          <div key={item.id} className={`${index > 0 && "pt-5"}`}>
            <NewsLayout news={item} withText withPhoto lineClamp={2} />
          </div>
        ))}
      </div>

      {/* Колонка 4 */}
      <div className=" md:space-y-6 md:pl-4 border-neutral-200 md:divide-y divide-neutral-200">
        {col4.map((item, index) => (
          <div key={item.id} className={`${index > 0 && "pt-5"}`}>
            <NewsLayout news={item} withText lineClamp={2} />
          </div>
        ))}
      </div>
    </section>
  );
}
