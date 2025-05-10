export const revalidate = 300; // например, 5 минут

import { db, ref, get, child } from "@/lib/firebase";
import { notFound } from "next/navigation";
import NewsContent from "@/components/newsClient";
import FadeWrapper from "@/components/fadeWrapper";
import { getMessages } from "@/lib/getMessages";

// export async function generateStaticParams() {
//   return [];
// }
export async function generateStaticParams() {
  const snapshot = await get(child(ref(db), "news"));
  const data = snapshot.exists() ? snapshot.val() : {};

  return Object.entries(data)
    .filter(([_, news]) => news.status === "published")
    .flatMap(([_, news]) =>
      Object.entries(news.translations || {}).map(([locale, t]) => ({
        locale,
        category: news.category,
        slug: t?.slug,
      }))
    )
    .filter((p) => p.slug); // только с валидным slug
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  const id = slug?.split("-").at(-1);

  if (!id) {
    return { title: "Not found" };
  }

  const messages = await getMessages(locale);
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
  const url = `https://perec.news/${locale}/${news.category}/${news.translations[locale].slug}`;
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
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    other: {
      "x-debug-tag": "from-generateMetadata",
    },
  };
}

export default async function NewsPage({ params }) {
  const { slug, locale } = await params;
  const id = slug?.split("-").at(-1);

  const snapshot = await get(child(ref(db), `news/${id}`));
  const data = snapshot.exists() ? snapshot.val() : null;

  if (!data || data.status !== "published" || !data.translations?.[locale]) {
    return notFound();
  }

  const messages = await getMessages(locale);
  const categoryName = messages.categoryName?.[data.category];

  const newsSnapshot = await get(child(ref(db), "news"));
  const authorsSnapshot = await get(child(ref(db), "authors"));

  const newsData = newsSnapshot.exists() ? newsSnapshot.val() : {};
  const authorsData = authorsSnapshot.exists() ? authorsSnapshot.val() : {};

  const news = Object.entries(newsData)
    .map(([id, item]) => ({ _id: id, ...item }))
    .filter((item) => {
      const t = item.translations?.[locale];
      return (
        item.status === "published" &&
        item.category === data.category &&
        item._id !== data._id &&
        t?.title?.trim() &&
        t?.content?.trim()
      );
    })
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .slice(0, 4);

  const authors = Object.values(authorsData);
  const currentAvatar =
    data?.satire?.author !== ""
      ? authors.find((a) => a.style === data?.satire?.style)?.avatar
      : data.user.avatar;

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: data.translations[locale].title,
    image: [
      Array.isArray(data.images) && data.images.length > 0
        ? data.images[0]
        : "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media",
    ],
    datePublished: new Date(data.createdAt).toISOString(),
    dateModified: new Date(data.updatedAt || data.createdAt).toISOString(),
    author: {
      "@type": "Person",
      name: data.satire?.author || "PEREC.news",
    },
    publisher: {
      "@type": "Organization",
      name: "PEREC.news",
      logo: {
        "@type": "ImageObject",
        url: "https://perec.news/logoperec.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://perec.news/${locale}/${data.category}/${data.translations[locale].slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FadeWrapper>
        <NewsContent
          data={data}
          locale={locale}
          messages={messages}
          categoryName={categoryName}
          news={news}
          currentAvatar={currentAvatar}
        />
      </FadeWrapper>
    </>
  );
}
