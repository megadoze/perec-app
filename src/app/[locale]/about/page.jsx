import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const about = messages;

  return {
    title: about.aboutTitle,
    description: about.aboutDescription,
    openGraph: {
      title: about.aboutTitle,
      description: about.aboutDescription,
      url: `https://perec.news/${locale}/about`,
      siteName: about.ogSiteName,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: about.aboutTitle,
      description: about.aboutDescription,
    },
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const about = messages;

  return (
    <section className="mt-10 max-w-3xl mx-auto px-0 pb-16 font-light text-lg">
      <h1 className="text-2xl lg:text-3xl mb-6 font-normal">
        {about.aboutHeading}
      </h1>
      <p className="mb-4">{about.paragraph1}</p>
      <p className="mb-4 font-normal">{about.paragraph2}</p>
      <p className="mb-4 font-normal">{about.paragraph3}</p>
      <p className="mb-4">{about.paragraph4}</p>

      <h2 className="text-2xl font-normal mt-8 mb-4">{about.audience}</h2>
      <ul className="list-disc pl-5 space-y-2">
        {about.audiencePoints.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-normal mt-8 mb-4">{about.sections} </h2>
      <ul className="list-disc pl-5 space-y-2">
        {about.sectionsList.map((s, i) => (
          <li key={i}>
            <strong>{s.title}</strong> {s.text}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-normal mt-8 mb-4">{about.mission}</h2>

      {about.missionText}
    </section>
  );
}
