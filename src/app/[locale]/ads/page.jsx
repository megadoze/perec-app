import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const ads = messages;

  return {
    title: ads.adsTitle,
    description: ads.adsDescription,
    openGraph: {
      title: ads.adsTitle,
      description: ads.adsDescription,
      url: `https://perec.news/${locale}/ads`,
      siteName: ads.adsTitle,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: ads.adsTitle,
      description: ads.adsDescription,
    },
  };
}

export default async function AdsPage({ params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const ads = messages;

  return (
    <section className="mt-10 max-w-3xl mx-auto px-4 pb-16 font-light text-lg">
      <h1 className=" text-2xl lg:text-3xl mb-6 font-normal">
        {ads.adsHeading}
      </h1>
      <p className="mb-4"> {ads.adsDescription}</p>
      <p className="mb-2 font-light">
        Email:{" "}
        <a href="mailto:contact@perec.news" className="text-red-600">
          {ads.adsEmail}
        </a>
      </p>
    </section>
  );
}
