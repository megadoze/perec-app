import PodcastPlayer from "./PodcastPlayer";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = (await import(`@/lang/${locale}/common.json`)).default;

  return {
    title: messages.categoryName.podcasts + " | Perec.news",
    description: messages.categoryDescription.podcasts,
    openGraph: {
      title: messages.categoryName.podcasts,
      description: messages.categoryDescription.podcasts,
      url: `https://perec.news/${locale}/podcasts`,
      siteName: messages.ogSiteName,
      type: "website",
    },
  };
}

export default function Page() {
  return <PodcastPlayer />;
}
