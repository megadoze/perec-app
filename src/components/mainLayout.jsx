import { NewsLayout } from "./newsLayout";

// function formatDate(timestamp) {
//   return new Date(timestamp).toLocaleDateString("ru-RU", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// }

// function highlightFirstWord(title, color = "") {
//   const [first, ...rest] = title.split(" ");
//   return color ? (
//     <>
//       <span className={`${color} px-1 rounded-sm`}>{first}</span>{" "}
//       {rest.join(" ")}
//     </>
//   ) : (
//     title
//   );
// }

export default function MainLayout({ news }) {
  if (!news?.length) return <p>Нет новостей</p>;

  const col1 = news.slice(0, 2);
  const col2 = news[2];
  const col3 = news.slice(3, 5);
  const col4 = news.slice(5, 7);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.5fr_1fr_1.1fr] lg:divide-x divide-neutral-200">
      {/* Колонка 1 */}
      <div className="order-2 sm:order-1 md:space-y-6 md:divide-y pr-4 pb-8 border-neutral-200 md:border-r lg:border-r-0 divide-neutral-200">
        {col1.map((item, index) => (
          <div key={item.id} className={`${index > 0 && "pt-5"}`}>
            <NewsLayout news={item} withText maincat />
          </div>
        ))}
      </div>

      {/* Колонка 2 */}
      <div className="order-1 sm:order-2 md:pl-4 md:pr-0 lg:px-4 pb-8 border-neutral-200">
        <NewsLayout news={col2} main withPhoto withText maincat />
      </div>

      {/* Колонка 3 */}
      <div className="order-3 space-y-8 md:pr-4 lg:px-4 pb-6 md:pb-0 border-neutral-200 md:border-r lg:border-r-0 divide-neutral-200">
        {col3.map((item) => (
          <NewsLayout key={item.id} news={item} withPhoto maincat />
        ))}
      </div>

      {/* Колонка 4 */}
      <div className="order-4 md:space-y-6 md:pl-4 border-neutral-200 md:divide-y divide-neutral-200">
        {col4.map((item, index) => (
          <div key={item.id} className={`${index > 0 && "pt-5"}`}>
            <NewsLayout news={item} withText maincat />
          </div>
        ))}
      </div>
    </section>
  );
}
