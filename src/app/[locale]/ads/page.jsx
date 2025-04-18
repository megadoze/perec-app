import AdsClient from "./adsClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = (await import(`@/lang/${locale}/ads.json`)).default;

  return {
    title: messages.title || "О нас — PEREC.news",
    description:
      messages.description ||
      "Узнайте больше о философии, рубриках и миссии сатирического медиа PEREC.news",
    openGraph: {
      title: messages.title || "О нас — PEREC.news",
      description:
        messages.ogDescription ||
        "Perec.news — это политико-сатирический онлайн-ресурс, который освещает актуальные темы через призму юмора и иронии.",
      url: `https://perec.news/${locale}/about`,
      siteName: "PEREC.news — нескучные новости🔥",
      type: "website",
    },
  };
}

export default function AdsPage() {
  return <AdsClient />;
}
