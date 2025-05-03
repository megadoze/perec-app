import { db, ref, get, child } from "@/lib/firebase";
import { notFound } from "next/navigation";

export default async function NewsLayout({ children, params }) {
  const { slug, locale, category } = await params;
  const id = slug?.split("-").at(-1);

  const snapshot = await get(child(ref(db), `news/${id}`));
  const data = snapshot.exists() ? snapshot.val() : null;

  if (!data || data.status !== "published") {
    notFound();
  }

  const t = data.translations?.[locale];

  if (!t || !t.title) {
    notFound();
  }

  const image =
    Array.isArray(data.images) && data.images.length > 0
      ? data.images[0]
      : "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media";

  const url = `https://perec.news/${locale}/${category}/${slug}`;

  return (
    <html lang={locale}>
      <head>
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.subTitle || ""} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.title} />
        <meta name="twitter:description" content={t.subTitle || ""} />
        <meta name="twitter:image" content={image} />
      </head>
      <body>{children}</body>
    </html>
  );
}
