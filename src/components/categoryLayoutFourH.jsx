import { NewsLayout } from "./newsLayout";

export default function CategoryLayoutFourH({
  news,
  withPhoto,
  withText,
  lineClamp,
  locale,
}) {
  const emptyNews = {
    ru: "Нет новостей",
    en: "No news",
  };
  
  if (!news?.length) return <p>{emptyNews[locale]}</p>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-y-10">
      {news.map((item, idx) => (
        <div
          key={item.id}
          className="
          px-0 md:px-4 pb-0
          // Вертикальные бордеры
          md:[&:not(:nth-child(2n+1))]:border-l md:border-neutral-100
          lg:[&:not(:nth-child(4n+1))]:border-l lg:border-neutral-100

          
          // Убираем отступы у краёв строки

          md:[&:nth-child(2n+1)]:pl-0
          md:[&:nth-child(2n)]:pr-0

          lg:[&:nth-child(4n+1)]:pl-0
          lg:[&:nth-child(3n+1)]:pl-4
          lg:[&:nth-child(3n)]:pl-4
          lg:[&:nth-child(2n)]:pr-4
          lg:[&:nth-child(4n+1)]:pr-4
          lg:[&:nth-child(4n)]:pr-0
        "
        >
          <NewsLayout
            news={item}
            withPhoto={withPhoto}
            withText={withText}
            lineClamp={lineClamp}
            locale={locale}
          />
        </div>
      ))}
    </section>
  );
}
