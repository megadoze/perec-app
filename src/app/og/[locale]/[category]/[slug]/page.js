import { db, ref, get, child } from "@/lib/firebase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OGPage({ params }) {
  const { locale, category, slug } = params;
  const id = slug?.split("-").at(-1);
  const canonicalUrl = `https://perec.news/${locale}/${category}/${slug}`;

  if (!id) return notFoundHtml(canonicalUrl);

  const snapshot = await get(child(ref(db), `news/${id}`));
  const news = snapshot.val();

  if (!news || !news.translations?.[locale]) {
    return notFoundHtml(canonicalUrl);
  }

  const t = news.translations[locale];
  const title = t.title || "Новость от PEREC.news";
  const description =
    t.subTitle ||
    "Острая, сатирическая и немного странная новость от PEREC.news";
  const image =
    news.ogImage || // рекомендуемое поле без `token=`
    news.images?.[0].url ||
    "https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media";

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="PEREC.news" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta httpEquiv="refresh" content={`2;url=${canonicalUrl}`} />
      </head>
      <body>
        <p>Перенаправляем...</p>
      </body>
    </html>
  );
}

function notFoundHtml(redirectUrl) {
  return (
    <html>
      <head>
        <title>Новость не найдена</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Новость не найдена" />
        <meta
          property="og:description"
          content="Запрашиваемая новость недоступна"
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/perec-news.firebasestorage.app/o/public%2Fpublic_perec.webp?alt=media"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={redirectUrl} />
        <meta httpEquiv="refresh" content={`2;url=${redirectUrl}`} />
      </head>
      <body>
        <p>Новость не найдена. Перенаправляем...</p>
      </body>
    </html>
  );
}
