import { db, ref, get, child } from "@/lib/firebase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OGPreviewPage({ params }) {
  const { slug, locale, category } = params;
  const id = slug?.split("-").at(-1);

  if (!id) return notFoundHtml();

  const snapshot = await get(child(ref(db), `news/${id}`));
  const news = snapshot.val();

  if (!news || !news.translations?.[locale]) {
    return notFoundHtml();
  }

  const t = news.translations[locale];
  const title = t.title;
  const description = t.subTitle || "Читайте острое на PEREC.news";
  const image = Array.isArray(news.images) && news.images.length > 0
    ? news.images[0]
    : "https://perec.news/default-og.jpg";
  const canonicalUrl = `https://perec.news/${locale}/${category}/${slug}`;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="PEREC.news — нескучные новости🔥" />
        <meta property="og:type" content="article" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta httpEquiv="refresh" content={`0;url=${canonicalUrl}`} />
        <title>{title}</title>
      </head>
      <body>
        <p>Redirecting to main article…</p>
      </body>
    </html>
  );
}

function notFoundHtml() {
  return (
    <html>
      <head>
        <meta property="og:title" content="Новость не найдена" />
        <meta property="og:description" content="Упс, такого материала нет" />
        <meta httpEquiv="refresh" content="0;url=/" />
        <title>Новость не найдена</title>
      </head>
      <body>
        <p>Новость не найдена. Перенаправляем...</p>
      </body>
    </html>
  );
}
