import { db, ref, get, child } from "@/lib/firebase";
import { notFound } from "next/navigation";
import CategoryClient from "@/components/categoryClient";

export async function generateMetadata({ params }) {
  const { category, locale } = await params;

  const messages = (await import(`@/lang/${locale}/common.json`)).default;
  const title = messages.categoryName?.[category];

  if (!title) return notFound();

  const name = `${title} | PEREC.news`;
  const description = messages.categoryDescription?.[category] || "";
  const ogSiteName = messages.ogSiteName;

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      url: `https://perec.news/${category}`,
      siteName: ogSiteName,
      type: "article",
      images: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media",
          width: 1200,
          height: 630,
          alt: ogSiteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      images: [
        "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media",
      ],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category, locale } = await params;

  const messages = (await import(`@/lang/${locale}/common.json`)).default;
  const title = messages.categoryName?.[category];
  if (!title) return notFound();

  const snapshot = await get(child(ref(db), "news"));
  const data = snapshot.exists() ? snapshot.val() : {};

  const news = Object.entries(data)
    .map(([id, item]) => ({ id, ...item }))
    .filter((item) => item.status === "published" && item.category === category)
    .sort((a, b) => b.publishedAt - a.publishedAt);

  return <CategoryClient title={title} news={news} category={category} />;
}
