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

  const description =
    news.subTitle || "Читайте последние новости на нашем сайте.";
  const url = `https://perec-news.web.app/news/${id}`;
  //   const image =
  //     news.image[0] ||
  //     "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/news%2F20250308_BRP503.webp?alt=media&token=912c3ea4-ab76-47f3-b867-5c55d77bc588";

  return {
    title: news.title,
    description,
    openGraph: {
      title: news.title,
      description,
      url,
      siteName: "PEREC.news - нескучные новости!🔥",
      type: "article",
      //   images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description,
      //   images: [image],
    },
  };
}

export default async function NewsPage(props) {
  const { id } = await props.params; // 👈 обязательное await
  const snapshot = await get(child(ref(db), `news/${id}`));
  const news = snapshot.val();

  if (!news || news.publishAt > Date.now()) {
    return (
      <div className="p-4 text-gray-600">
        Новость не найдена или ещё не опубликована.
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-narrow font-bold mb-2">{news.title}</h1>
      <p className="text-gray-500 text-sm mb-4">
        Опубликовано: {dayjs(news.publishAt).format("DD MMM YYYY HH:mm")}
      </p>
      <div
        className="text-lg font-light leading-relaxed"
        dangerouslySetInnerHTML={{ __html: news.content }}
      ></div>
      <p className="mt-6 text-sm text-gray-400">
        Источник:{" "}
        <a
          href={news.originalLink}
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          rbc.ua
        </a>
      </p>
      <Link
        href="/"
        className="inline-block mt-6 text-blue-600 hover:underline"
      >
        ← Назад к новостям
      </Link>
    </article>
  );
}
