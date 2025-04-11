export const runtime = "nodejs";

import { db, ref, get, child } from "@/lib/firebase";
import dayjs from "dayjs";
import { notFound } from "next/navigation";
import BackButton from "@/components/backButton";

export async function generateMetadata(props) {
  const params = await props.params;
  const id = params.slug?.split("-").at(-1);

  const snapshot = await get(child(ref(db), `news/${id}`));
  const news = snapshot.val();

  if (!news) {
    return { title: "Новость не найдена" };
  }

  const description = news.subTitle || "Добавляем остроты в скучные новости!";
  const url = `https://perec-news.web.app/news/${id}`;
  const image =
    Array.isArray(news?.images) && news.images.length > 0
      ? news.images[0]
      : "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media";

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
  const params = await props.params;
  const id = params.slug?.split("-").at(-1);

  const snapshot = await get(child(ref(db), `news/${id}`));
  const data = snapshot.exists() ? snapshot.val() : null;

  if (!data || data.status !== "published") {
    return notFound();
  }

  return (
    <article className="max-w-3xl mx-auto p-0">
      <h1 className="text-3xl font-narrow font-bold mb-2">{data.title}</h1>
      <p className="text-gray-500 text-sm mb-4">
        Опубликовано: {dayjs(data.publishedAt).format("DD MMM YYYY HH:mm")}
      </p>
      <h2 className="text-xl font-narrow">{data?.subTitle}</h2>
      <div
        className="pt-4 text-lg font-light leading-relaxed"
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></div>
      <p className="mt-6 text-sm text-gray-400">Автор: {data.author}</p>
      <BackButton />
    </article>
  );
}
