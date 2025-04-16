"use client";

import Head from "next/head";

export default function JsonLdSchema({ data }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: data.title,
    image: [data.images?.[0]],
    datePublished: new Date(data.createdAt).toISOString(),
    dateModified: new Date(data.updatedAt || data.createdAt).toISOString(),
    author: {
      "@type": "Person",
      name: data.author || "PEREC.news",
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
      "@id": `https://perec-app.vercel.app/${data.category}/${data.slug}`,
    },
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Head>
  );
}
