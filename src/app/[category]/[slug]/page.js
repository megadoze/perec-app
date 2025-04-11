export const runtime = "nodejs";

import { db, ref, get, child } from "@/lib/firebase";
import Link from "next/link";
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

  const description = news.subTitle || "Нескучные новости на PEREC.news!🔥";
  const url = `https://perec-news.web.app/news/${id}`;
  const image = news?.images
    ? news?.images[0]
    : "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media&token=12734781-3f48-4b57-b2a1-7d8ac626b3ee";

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
      <p className="mt-6 text-sm text-gray-400">
        Автор:{" "}
        <a
          href={data.originalLink}
          className=""
          target="_blank"
          rel="noreferrer"
        >
          {data.author}
        </a>
      </p>
      {/* <Link
        href={"/"}
        className="inline-flex items-center gap-1 mt-6 text-cyan-700/60 "
      >
        <span className=" pb-1">←</span>{" "}
        <span className="">Назад к новостям</span>
      </Link> */}
      <BackButton />
    </article>
  );
}
