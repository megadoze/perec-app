import { db, ref, get, child } from "@/lib/firebase";
import { notFound } from "next/navigation";
import CategoryClient from "@/components/categoryClient";

const categoryTitles = {
  politics: "Политический перчик",
  economics: "Экономика с огоньком",
  life: "Жизнь острая как чили",
  culture: "Поп-культура в перце",
};

// const allowedCategories = Object.keys(categoryTitles);

export async function generateMetadata({ params }) {
  const { category } = await params; // 👈 обязательное await
  const title = categoryTitles[category];
  if (!title) return notFound();

  return {
    title: `${title} | PEREC.news`,
    description: `Новости по теме "${title}"`,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params; // 👈 обязательное await
  console.log(category);

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
