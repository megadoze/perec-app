import AdsClient from "./adsClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = (await import(`@/lang/${locale}/ads.json`)).default;

  return {
    title: messages.adstitle || "О нас — PEREC.news",
    description:
      messages.adsdescription ||
      "Узнайте больше о философии, рубриках и миссии сатирического медиа PEREC.news",
    openGraph: {
      title: messages.ogTitle || "Реклама — PEREC.news",
      description:
        messages.adsdescription ||
        "Perec.news — это политико-сатирический онлайн-ресурс, который освещает актуальные темы через призму юмора и иронии.",
      url: `https://perec.news/${locale}/ads`,
      siteName: messages.ogSiteName || "PEREC.news — нескучные новости🔥",
      type: "website",
    },
  };
}

export default function AdsPage() {
  return <AdsClient />;
}
