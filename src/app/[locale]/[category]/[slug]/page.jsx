export const runtime = "nodejs";

import { db, ref, get, child } from "@/lib/firebase";
import { notFound } from "next/navigation";
import NewsContent from "@/components/newsClient";
import FadeWrapper from "@/components/fadeWrapper";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const id = slug?.split("-").at(-1);

  const snapshot = await get(child(ref(db), `news/${id}`));
  const news = snapshot.val();

  if (!news) {
    return { title: "Новость не найдена" };
  }

  const description = news.subTitle || "Добавляем остроты в скучные новости!";
  const url = `https://perec-news.web.app/${news.category}/${news.slug}`;
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

export default async function NewsPage({ params }) {
  const { slug } = await params;
  const id = slug?.split("-").at(-1);

  const snapshot = await get(child(ref(db), `news/${id}`));
  const data = snapshot.exists() ? snapshot.val() : null;

  if (!data || data.status !== "published") {
    return notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: data.title,
    image: [data.images?.[0] || "default-image-url"],
    datePublished: new Date(data.createdAt).toISOString(),
    dateModified: new Date(data.updatedAt || data.createdAt).toISOString(),
    author: {
      "@type": "Person",
      name: data.author || "PEREC.news",
    },
    publisher: {
      "@type": "Organization",
      name: "PEREC.news",
      logo: {
        "@type": "ImageObject",
        url: "https://perec-app.vercel.app/logoperec.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://perec-app.vercel.app/${data.category}/${data.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FadeWrapper>
        <NewsContent data={data} />
      </FadeWrapper>
    </>
  );
}
