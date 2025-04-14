export const metadata = {
  title: "Контакты | PEREC.news",
  description:
    "Свяжитесь с нами по вопросам сотрудничества, предложений или обратной связи.",
};

export default function ContactsPage() {
  return (
    <main className="max-w-3xl mx-auto p-5 text-lg">
      <h1 className="text-2xl font-bold mb-4">Контакты</h1>
      <p className="mb-2">
        Мы всегда рады обратной связи от наших читателей и партнёров.
      </p>
      <p className="mb-2">
        Email:{" "}
        <a
          href="mailto:contact@perec.news"
          className="text-orange-700 hover:underline"
        >
          contact@perec.news
        </a>
      </p>
      <p>
        Telegram:{" "}
        <a
          href="https://t.me/perecnews"
          className="text-orange-700 hover:underline"
        >
          @perecnews
        </a>
      </p>
    </main>
  );
}
