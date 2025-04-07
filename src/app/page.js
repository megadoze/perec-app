// src/app/page.js
import { db, ref, get } from "../lib/firebase";
import Link from "next/link";
import dayjs from "dayjs";

async function getNews() {
  const snapshot = await get(ref(db, "news"));
  const data = snapshot.val() || {};
  const now = Date.now();

  return Object.values(data)
    .filter((item) => item.status === "scheduled" && item.publishAt <= now)
    .sort((a, b) => b.publishAt - a.publishAt);
}

export default async function HomePage() {
  const news = await getNews();

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Новости</h1>
      {news.length === 0 && <p>Нет опубликованных новостей</p>}
      {news.map((item) => (
        <div key={item.id} className="mb-6 border-b pb-4">
          <Link
            href={`/news/${item.id}`}
            className="text-xl font-semibold hover:underline"
          >
            {item.title}
          </Link>
          <p className="text-gray-600 text-sm">
            {dayjs(item.publishAt).format("DD MMM YYYY HH:mm")}
          </p>
          <p className="mt-2">{item.content.slice(0, 150)}...</p>
        </div>
      ))}
    </main>
  );
}
