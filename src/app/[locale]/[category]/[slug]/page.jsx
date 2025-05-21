import { db, ref, get, child } from "@/lib/firebase";
import { notFound } from "next/navigation";
import NewsContent from "@/components/newsClient";
import FadeWrapper from "@/components/fadeWrapper";
import { getMessages } from "@/lib/getMessages";
import MediaLayout from "@/components/mediaLayout";

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

  const t = news.translations?.[locale];
  if (!t) return { title: emptyNews[locale] };

  const title = t.seoTitle || t.title;
  const description = t.seoDescription || t.subTitle;
  const url = `https://perec.news/${locale}/${news.category}/${news.translations[locale].slug}`;
  const image =
    news.images?.[0]?.type === "video"
      ? news.images?.[0]?.poster
      : news.images?.[0]?.url ||
        "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteName || "PEREC NEWS",
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

  // 🔒 Защита от недопустимого ID
  if (!id || /[.#$\[\]]/.test(id)) {
    return { title: "Not found" };
  }

  const snapshot = await get(child(ref(db), `news/${id}`));
  const data = snapshot.exists() ? snapshot.val() : null;

  if (!data || data.status !== "published" || !data.translations?.[locale]) {
    return notFound();
  }

  if (data.category === "media") {
    return <MediaLayout data={data} locale={locale} />;
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
    headline:
      data.translations[locale].seoTitle || data.translations[locale].title,
    image: [
      news.images?.[0]?.type === "video"
        ? news.images?.[0]?.poster
        : news.images?.[0]?.url ||
          "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media",
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
