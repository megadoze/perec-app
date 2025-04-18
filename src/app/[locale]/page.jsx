import { getTranslations } from "next-intl/server";
import ClientHome from "@/components/clientHome";
import { db, ref, get, child } from "@/lib/firebase";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const t = await getTranslations({ locale: locale });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://perec-app.vercel.app/${locale}`,
      siteName: t("metaTitle"),
      images: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media",
          width: 1200,
          height: 630,
          alt: t("metaTitle"),
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaTwitterDescription"),
      images: [
        "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media",
      ],
    },
  };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const snapshot = await get(child(ref(db), "news"));
  const data = snapshot.exists() ? snapshot.val() : {};

  const news = Object.entries(data)
    .map(([id, item]) => ({ id, ...item }))
    .filter((item) => item.status === "published")
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .slice(0, 100);

  return <ClientHome initialNews={news} locale={locale} />;
}
