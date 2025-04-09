import NewsCategory from "@/components/newsCategory.jsx";
import NewsSection from "../components/NewsSection.jsx";
import { db, ref, get, child } from "@/lib/firebase";

export const dynamic = "force-dynamic"; // чтобы Firebase работал на Vercel

export default async function Home() {
  const snapshot = await get(child(ref(db), "news"));
  const data = snapshot.exists() ? snapshot.val() : {};

  const news = Object.entries(data)
    .map(([id, item]) => ({ id, ...item }))
    .filter((item) => item.status === "published") // <-- Только опубликованные
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .slice(0, 20);

  const politics = news
    .filter((item) => item.category === "politics")
    .slice(0, 4);

  const economics = news
    .filter((item) => item.category === "economics")
    .slice(0, 4);

  return (
    <>
      {/* <h1 className="text-xl font-bold mb-6">Latest Updates</h1> */}
      <NewsSection news={news} />
      <div className=" my-6 border-t border-neutral-200"></div>
      <h2 className=" font-narrow text-xl pb-6 text-orange-800">
        Политический перчик
      </h2>
      <NewsCategory news={politics} />
      <div className=" my-6 border-t border-neutral-200"></div>
      <h2 className=" font-narrow text-xl pb-6 text-orange-800">
        Экономика с огоньком
      </h2>
      <NewsCategory news={economics} />
    </>
  );
}
