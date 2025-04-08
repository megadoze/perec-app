import Link from "next/link";

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function highlightFirstWord(title, color = "") {
  const [first, ...rest] = title.split(" ");
  return color ? (
    <>
      <span className={`${color} px-1 rounded-sm`}>{first}</span>{" "}
      {rest.join(" ")}
    </>
  ) : (
    title
  );
}

export default function NewsSection({ news }) {
  if (!news?.length) return <p>Нет новостей</p>;

  const col1 = news.slice(0, 2);
  const main = news[2];
  const mini = news.slice(3, 5);
  const col4 = news.slice(5, 7);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.5fr_1fr_1.1fr] lg:divide-x divide-neutral-200">
      {/* Колонка 1 */}
      <div className="order-2 sm:order-1 md:space-y-6 pr-4 pb-8 border-neutral-200 md:divide-y md:border-r lg:border-r-0 divide-neutral-200">
        {col1.map((item, index) => (
          <article key={item.id} className="pt-6 first:pt-0">
            <Link href={`/news/${item.id}`}>
              <h3 className="text-2xl font-bold font-narrow leading-tight">
                {highlightFirstWord(item.title, "bg-orange-200 text-black")}
              </h3>
            </Link>
            <div
              className=" text-lg font-light text-neutral-800 mt-3 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></div>
            <div className="text-sm text-neutral-500 mt-2 flex flex-col gap-1">
              <span className="">{item.category}</span>
              {/* <span>{item.author}</span>
              <span className="text-[10px]">
                {formatDate(item.publishedAt)}
              </span> */}
            </div>
          </article>
        ))}
      </div>

      {/* Колонка 2 */}
      <div className="order-1 sm:order-2 md:pl-4 md:pr-0 lg:px-4 pb-8 border-neutral-200">
        {main?.images && (
          <Link href={`/news/${main.id}`}>
            <div className="overflow-hidden">
              <img
                src={main?.images[0]}
                alt={main.title}
                className="w-full h-56 md:h-52 xl:h-64 object-cover hover:opacity-90 "
              />
            </div>
          </Link>
        )}
        <Link href={`/news/${main.id}`}>
          <h2 className=" pt-2 text-3xl font-bold font-narrow leading-tight">
            {main?.title}
          </h2>
        </Link>
        <div
          className="text-lg font-light text-neutral-800 mt-3 line-clamp-3 lg:line-clamp-6"
          dangerouslySetInnerHTML={{ __html: main.content }}
        ></div>

        <div className="text-sm text-neutral-500 mt-2">
          <span className="">{main.category}</span>
          {/* <span>{main?.author}</span> ·{" "}
          <span className="text-[10px]">{formatDate(main?.publishedAt)}</span> */}
        </div>
      </div>

      {/* Колонка 3 */}
      <div className="order-3 space-y-8 md:pr-4 lg:px-4 pb-8 border-neutral-200 md:border-r lg:border-r-0 divide-neutral-200">
        {mini.map((item) => (
          <article key={item.id}>
            {item?.images && (
              <Link href={`/news/${item.id}`}>
                <div className="overflow-hidden">
                  <img
                    src={item?.images[0]}
                    alt={item.title}
                    className="w-full h-56 md:h-52 lg:h-36 xl:h-40 object-cover hover:opacity-90"
                  />
                </div>
              </Link>
            )}
            <Link href={`/news/${item.id}`}>
              <h4 className="pt-2 font-semibold font-narrow text-2xl line-clamp-3">
                {item.title}
              </h4>
            </Link>
            {/* <p className="text-xs text-neutral-500 mt-1">{item.author}</p> */}
            <p className="text-sm text-neutral-500 pt-2">{item.category}</p>
          </article>
        ))}
      </div>

      {/* Колонка 4 */}
      <div className="order-4 md:space-y-6 md:pl-4 border-neutral-200 md:divide-y divide-neutral-200">
        {col4.map((item) => (
          <article key={item.id} className="pt-6 first:pt-0">
            <Link href={`/news/${item.id}`}>
              <h3 className="font-semibold font-narrow leading-tight text-2xl">
                {highlightFirstWord(item.title, "bg-yellow-200 text-black")}
              </h3>
            </Link>
            <div
              className="text-lg font-light text-neutral-800 mt-3 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
            <p className="text-sm text-neutral-500 pt-2">{item.category}</p>
            {/* <p className="text-xs text-neutral-500 mt-1">{item.author}</p> */}
          </article>
        ))}
      </div>
    </section>
  );
}
