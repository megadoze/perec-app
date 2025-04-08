export const runtime = "nodejs";

import { db, ref, get, child } from "@/lib/firebase";
import Link from "next/link";
import dayjs from "dayjs";

export async function generateMetadata(props) {
  const { id } = await props.params; // 👈 обязательное await
  const snapshot = await get(child(ref(db), `news/${id}`));
  const news = snapshot.val();

  if (!news) {
    return { title: "Новость не найдена" };
  }

  const description = news.subTitle || "Нескучные новости на PEREC.news!🔥";
  const url = `https://perec-news.web.app/news/${id}`;
  const image =
    news.images[0] ||
    "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media&token=12734781-3f48-4b57-b2a1-7d8ac626b3ee";

  return {
    title: news.title,
    description,
    openGraph: {
      title: news.title,
      description,
      url,
      siteName: "PEREC.news - нескучные новости!🔥",
      type: "article",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description,
      images: [image],
    },
  };
}

export default async function NewsPage(props) {
  const { id } = await props.params; // 👈 обязательное await
  const snapshot = await get(child(ref(db), `news/${id}`));
  const news = snapshot.val();

  if (!news || news.publishedAt > Date.now()) {
    return (
      <div className="p-4 text-gray-600">
        Новость не найдена или ещё не опубликована.
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto p-0">
      <h1 className="text-3xl font-narrow font-bold mb-2">{news.title}</h1>
      <p className="text-gray-500 text-sm mb-4">
        Опубликовано: {dayjs(news.publishedAt).format("DD MMM YYYY HH:mm")}
      </p>
      <h2 className="text-xl font-narrow">{news?.subTitle}</h2>
      <div
        className="pt-4 text-lg font-light leading-relaxed"
        dangerouslySetInnerHTML={{ __html: news.content }}
      ></div>
      <p className="mt-6 text-sm text-gray-400">
        Автор:{" "}
        <a
          href={news.originalLink}
          className=""
          target="_blank"
          rel="noreferrer"
        >
          {news.author}
        </a>
      </p>
      <Link href="/" className="inline-block mt-6 text-cyan-700/60">
        ← Назад к новостям
      </Link>
    </article>
  );
}
