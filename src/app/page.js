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
    .slice(0, 8);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Latest Updates</h1>
      <NewsSection news={news} />
    </>
  );
}
