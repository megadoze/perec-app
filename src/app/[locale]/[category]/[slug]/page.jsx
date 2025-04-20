export const runtime = "nodejs";

import { db, ref, get, child } from "@/lib/firebase";
import { notFound } from "next/navigation";
import NewsContent from "@/components/newsClient";
import FadeWrapper from "@/components/fadeWrapper";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { locale } = await params;

  const id = slug?.split("-").at(-1);

  const messages = (await import(`@/lang/${locale}/common.json`)).default;

  const subTitleDesc = messages.metaTwitterDescription;
  const siteName = messages.metaTitle;

  const snapshot = await get(child(ref(db), `news/${id}`));
  const news = snapshot.val();

  const emptyNews = {
    ru: "Новость не найдена",
    en: "News not found",
  };

  if (!news) {
    return { title: emptyNews[locale] };
  }

  const title = news.translations[locale].title;
  const description = news.translations[locale].subTitle || subTitleDesc;
  const url = `https://perec-news.web.app/${locale}/${news.category}/${news.translations[locale].slug}`;
  const image =
    Array.isArray(news?.images) && news.images.length > 0
      ? news.images[0]
      : "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteName,
      type: "article",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function NewsPage({ params }) {
  const { slug } = await params;
  const id = slug?.split("-").at(-1);

  const { locale } = await params;

  const snapshot = await get(child(ref(db), `news/${id}`));
  const data = snapshot.exists() ? snapshot.val() : null;

  if (!data || data.status !== "published") {
    return notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: data.translations[locale].title,
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
      "@id": `https://perec-app.vercel.app/${locale}/${data.category}/${data.translations[locale].slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FadeWrapper>
        <NewsContent data={data} locale={locale} />
      </FadeWrapper>
    </>
  );
}
