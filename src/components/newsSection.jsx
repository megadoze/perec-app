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
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.5fr_1fr_1.1fr] divide-x divide-neutral-200">
      {/* Колонка 1 */}
      <div className="space-y-6 px-4 border-neutral-200 divide-y divide-neutral-200">
        {col1.map((item, index) => (
          <article key={item.id} className="pt-4 first:pt-0">
            <Link href={`/news/${item.id}`}>
              <h3 className="text-xl font-bold font-narrow leading-tight">
                {highlightFirstWord(item.title, "bg-orange-200 text-black")}
              </h3>
            </Link>
            <div
              className=" text-neutral-600 mt-1 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></div>
            <div className="text-xs text-neutral-500 mt-2 flex flex-col gap-0.5">
              <span>{item.author}</span>
              <span className="text-[10px]">
                {formatDate(item.publishedAt)}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Колонка 2 */}
      <div className="px-4 border-neutral-200">
        {main?.images && (
          <Link href={`/news/${main.id}`}>
            <img
              src={main?.images[0]}
              alt={main.title}
              className="w-full h-56 object-cover hover:opacity-90 transition mb-4"
            />
          </Link>
        )}
        <Link href={`/news/${main.id}`}>
          <h2 className="text-2xl font-bold font-narrow leading-tight">
            {main?.title}
          </h2>
        </Link>
        <div
          className=" text-lg text-neutral-600 mt-2"
          dangerouslySetInnerHTML={{ __html: main.content }}
        ></div>

        <div className="text-xs text-neutral-500 mt-2">
          <span>{main?.author}</span> ·{" "}
          <span className="text-[10px]">{formatDate(main?.publishedAt)}</span>
        </div>
      </div>

      {/* Колонка 3 */}
      <div className="space-y-6 px-4 border-neutral-200 divide-y divide-neutral-200">
        {mini.map((item) => (
          <article key={item.id} className="pt-4 first:pt-0">
            {item?.images && (
              <Link href={`/news/${item.id}`}>
                <img
                  src={item?.images[0]}
                  alt={item.title}
                  className="w-full h-40 object-cover hover:opacity-90 transition mb-2"
                />
              </Link>
            )}
            <Link href={`/news/${item.id}`}>
              <h4 className="font-semibold font-narrow text-xl line-clamp-3">
                {item.title}
              </h4>
            </Link>
            <p className="text-xs text-neutral-500 mt-1">{item.author}</p>
          </article>
        ))}
      </div>

      {/* Колонка 4 */}
      <div className="space-y-6 px-4 border-neutral-200 divide-y divide-neutral-200">
        {col4.map((item) => (
          <article key={item.id} className="pt-4 first:pt-0">
            <Link href={`/news/${item.id}`}>
              <h3 className="font-semibold font-narrow leading-tight text-xl">
                {highlightFirstWord(item.title, "bg-yellow-200 text-black")}
              </h3>
            </Link>
            <div
              className=" text-neutral-600 mt-1 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></div>
            <p className="text-xs text-neutral-500 mt-1">{item.author}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
