export const runtime = "nodejs";

import { db, ref, get, child } from "@/lib/firebase";
import { notFound } from "next/navigation";
import NewsContent from "@/components/newsClient";

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
      siteName: "PEREC.news - нескучные новости🔥",
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: data.title,
            description: data.subTitle || "",
            image: Array.isArray(data.images) ? data.images[0] : "",
            datePublished: new Date(data.publishedAt).toISOString(),
            author: {
              "@type": "Organization",
              name: "PEREC.news",
            },
          }),
        }}
      />
      <NewsContent data={data} />
    </>
  );
}
