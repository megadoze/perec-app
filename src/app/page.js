import { db, ref, get, child } from "@/lib/firebase";
import MainLayout from "../components/mainLayout.jsx";
import CategoryLayoutSix from "@/components/categoryLayoutSix.jsx";
import CategoryLayoutFourH from "@/components/categoryLayoutFourH.jsx";
import CategoryLayoutFourV from "@/components/categoryLayoutFourV.jsx";

export const dynamic = "force-dynamic"; // чтобы Firebase работал на Vercel

export default async function Home() {
  const snapshot = await get(child(ref(db), "news"));
  const data = snapshot.exists() ? snapshot.val() : {};

  const news = Object.entries(data)
    .map(([id, item]) => ({ id, ...item }))
    .filter((item) => item.status === "published") // <-- Только опубликованные
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .slice(0, 25);

  const politics = news
    .filter((item) => item.category === "politics")
    .slice(0, 4);

  const economics = news
    .filter((item) => item.category === "economics")
    .slice(0, 4);

  const life = news.filter((item) => item.category === "life").slice(0, 6);
  const culture = news
    .filter((item) => item.category === "culture")
    .slice(0, 6);

  return (
    <>
      <MainLayout news={news} />
      <div className=" my-6 border-t border-neutral-200"></div>
      {/* Politics */}
      <h2 className=" font-narrow text-xl pb-6 text-orange-800">
        Политический перчик
      </h2>
      <CategoryLayoutFourH news={politics} withText />
      <div className=" my-6 border-t border-neutral-200"></div>
      {/* Economics */}
      <h2 className=" font-narrow text-xl pb-6 text-orange-800">
        Экономика с огоньком
      </h2>
      <CategoryLayoutFourH news={economics} withPhoto withText />
      <div className=" my-6 border-t border-neutral-200"></div>
      {/* Life */}
      <h2 className=" font-narrow text-xl pb-6 text-orange-800">
        Жизнь острая как чили
      </h2>
      <CategoryLayoutSix news={life} />
      <div className=" my-6 border-t border-neutral-200"></div>
      {/* Culture */}
      <h2 className=" font-narrow text-xl pb-6 text-orange-800">
        Поп-культура с перцем
      </h2>
      <CategoryLayoutFourV news={culture} />
    </>
  );
}
