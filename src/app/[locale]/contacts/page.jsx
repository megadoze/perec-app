import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const contacts = messages;

  return {
    title: contacts.contactTitle,
    description: contacts.contactDescription,
    openGraph: {
      title: contacts.contactTitle,
      description: contacts.contactDescription,
      url: `https://perec.news/${locale}/contacts`,
      siteName: contacts.ogSiteName,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: contacts.contactTitle,
      description: contacts.contactDescription,
    },
  };
}

export default async function ContactsPage({ params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const contacts = messages;

  return (
    <main className="mt-10 max-w-3xl mx-auto px-0 pb-16 font-light text-lg">
      <h1 className="text-2xl lg:text-3xl mb-6 font-normal">
        {contacts.contactHeading}
      </h1>
      <p className="mb-2 font-light"> {contacts.contactDescription}</p>
      <p className="mb-2 font-light">
        Email:{" "}
        <a href="mailto:contact@perec.news" className="text-red-600">
          {contacts.contactEmail}
        </a>
      </p>
      <p className="font-light">
        Telegram:{" "}
        <a href="https://t.me/perecnews" className="text-red-600">
          {contacts.contactTelegram}
        </a>
      </p>
    </main>
  );
}
