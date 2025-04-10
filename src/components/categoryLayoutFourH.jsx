import { NewsLayout } from "./newsLayout";

export default function CategoryLayoutFourH({
  news,
  withPhoto,
  withText,
  lineClamp,
}) {
  if (!news?.length) return <p>Нет новостей</p>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 space-y-6 md:space-y-0 lg:grid-cols-4  lg:divide-x divide-neutral-200">
      {news.map((item) => (
        <div
          key={item.id}
          className=" md:odd:pr-4 md:even:pl-4 lg:px-4 lg:last:pr-0 lg:first:pl-0 md:odd:border-r lg:odd:border-r-0 md:first:pb-6 lg:first:pb-0"
        >
          <NewsLayout
            news={item}
            withPhoto={withPhoto}
            withText={withText}
            lineClamp={lineClamp}
          />
        </div>
      ))}
    </section>
  );
}
