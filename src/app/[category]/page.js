import { db, ref, get, child } from "@/lib/firebase";
import { notFound } from "next/navigation";
import CategoryClient from "@/components/categoryClient";

const categoryTitles = {
  politics: "Политический перчик",
  economics: "Экономика с огоньком",
  life: "Жизнь острая как чили",
  culture: "Поп-культура в перце",
};

const descriptionCategory = {
  politics:
    "Остроумные обзоры политической сцены, пародии на известных политиков и их решения",
  economics:
    "Финансовые и экономические события в сатирическом ключе: от инфляции до криптовалют",
  life: "Социальные проблемы, новости и тренды, поданные с изюминкой юмора",
  culture: "Ироничный взгляд на шоу-бизнес, кино, моду и интернет-тренды",
  bezkupur:
    "Самые абсурдные, смешные и неожиданные заголовки, которые просто невозможно не обсудить",
};

export async function generateMetadata({ params }) {
  const { category } = await params; // 👈 обязательное await
  const title = categoryTitles[category];
  if (!title) return notFound();

  const name = `${title} | PEREC.news`;
  const description = descriptionCategory[category];
  const url = `https://perec-news.web.app/${category}`;

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      url,
      siteName: "PEREC.news - нескучные новости🔥",
      type: "article",
      images: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media",
          width: 1200,
          height: 630,
          alt: "PEREC.news - нескучные новости🔥",
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
  const { category } = await params; // 👈 обязательное await

  const title = categoryTitles[category];
  if (!title) return notFound();

  const snapshot = await get(child(ref(db), "news"));
  const data = snapshot.exists() ? snapshot.val() : {};

  const news = Object.entries(data)
    .map(([id, item]) => ({ id, ...item }))
    .filter((item) => item.status === "published" && item.category === category)
    .sort((a, b) => b.publishedAt - a.publishedAt);

  return <CategoryClient title={title} news={news} />;
}
