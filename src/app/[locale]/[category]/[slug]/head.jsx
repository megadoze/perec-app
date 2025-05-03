// app/[locale]/[category]/[slug]/head.tsx

import { getNewsBySlug } from "@/lib/getNewsBySlug";

export default async function Head({ params }) {
  const { slug, locale } = params;
  const news = await getNewsBySlug(slug, locale);

  if (!news) return null;

  const title = news.title;
  const description = news.subTitle;
  const image = news.image;
  const url = `https://perec.news/${locale}/${news.category}/${news.slug}`;

  return (
    <>
      <title>{title}</title>
      <meta name="x-debug-tag" content="from-head-tsx" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
