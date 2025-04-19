import ContactsClient from "./contactsClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = (await import(`@/lang/${locale}/contacts.json`)).default;

  return {
    title: messages.title || "Контакты — PEREC.news",
    description:
      messages.description ||
      "Мы всегда рады обратной связи от наших читателей и партнёров",
    openGraph: {
      title: messages.title || "Контакты — PEREC.news",
      description:
        messages.ogDescription ||
        "Мы всегда рады обратной связи от наших читателей и партнёров",
      url: `https://perec.news/${locale}/contacts`,
      siteName: "PEREC.news — нескучные новости🔥",
      type: "website",
    },
  };
}

export default function ContactPage() {
  return <ContactsClient />;
}
