import ClientHome from "@/components/clientHome";
import { db, ref, get, child } from "@/lib/firebase";

export const metadata = {
  title: "PEREC.news — нескучные новости🔥",
  description:
    "Бросаем вызов традиционным медиа, делая новости не только информативными, но и захватывающе интересными!",
  openGraph: {
    title: "PEREC.news — нескучные новости🔥",
    description:
      "Бросаем вызов традиционным медиа, делая новости не только информативными, но и захватывающе интересными!",
    url: "https://perec-app.vercel.app/",
    siteName: "PEREC.news — нескучные новости🔥",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media",
        width: 1200,
        height: 630,
        alt: "PEREC.news - нескучные новости🔥",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PEREC.news — нескучные новости🔥",
    description: "Добавляем остроты в скучные новости!",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media",
    ],
  },
};

export default async function Home() {
  const snapshot = await get(child(ref(db), "news"));
  const data = snapshot.exists() ? snapshot.val() : {};

  const news = Object.entries(data)
    .map(([id, item]) => ({ id, ...item }))
    .filter((item) => item.status === "published")
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .slice(0, 100);

  return <ClientHome initialNews={news} />;
}
