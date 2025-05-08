import { db, ref, get, child } from "@/lib/firebase";
import { notFound } from "next/navigation";

export const dynamic = "force-static"; // нужно для предсказуемого SSR

export async function generateMetadata({ params }) {
  const { slug, locale } = params;
  const id = slug?.split("-").at(-1);

  if (!id) return { title: "Not found" };

  const messages = (await import(`@/lang/${locale}/common.json`)).default;
  const subTitleDesc = messages.metaTwitterDescription;
  const siteName = messages.metaTitle;

  const snapshot = await get(child(ref(db), `news/${id}`));
  const news = snapshot.val();

  if (!news || !news.translations?.[locale]) {
    return { title: "Not found" };
  }

  const t = news.translations[locale];
  const title = t.title;
  const description = t.subTitle || subTitleDesc;
  const image =
    Array.isArray(news.images) && news.images.length > 0
      ? news.images[0]
      : "https://perec.news/default-og.jpg";
  const url = `https://perec.news/og/${locale}/${news.category}/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName,
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
  };
}

export default function OGPreviewPage() {
  // Telegram не анализирует контент — ему нужны только <head>
  return (
    <html>
      <head>
        <meta property="og:title" content="Тестовый заголовок" />
        <meta property="og:description" content="Описание для Telegram" />
        <meta property="og:image" content="https://perec.news/test.jpg" />
        <meta property="og:type" content="article" />
        <meta httpEquiv="refresh" content="5;url=/ru/politics/..." />
      </head>
      <body>
        <p>Redirecting…</p>
      </body>
    </html>
  );
}
