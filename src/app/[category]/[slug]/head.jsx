// app/[category]/[slug]/head.jsx
import { db, ref, child, get } from "@/lib/firebase";

export default async function Head({ params }) {
  const id = params.slug?.split("-").at(-1);
  const snapshot = await get(child(ref(db), `news/${id}`));
  const news = snapshot.exists() ? snapshot.val() : null;

  if (!news) return null;

  const image =
    Array.isArray(news.images) && news.images.length > 0
      ? news.images[0]
      : "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media";

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    image: [image],
    datePublished: new Date(news.createdAt).toISOString(),
    dateModified: new Date(news.updatedAt || news.createdAt).toISOString(),
    author: {
      "@type": "Person",
      name: news.author || "PEREC.news",
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
      "@id": `https://perec-app.vercel.app/${news.category}/${news.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
