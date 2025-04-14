export const metadata = {
  title: "Реклама | PEREC.news",
  description: "Рекламные возможности и сотрудничество с PEREC.news",
};

export default function AdsPage() {
  return (
    <main className="max-w-3xl mx-auto p-5 text-lg">
      <h1 className="text-2xl font-bold mb-4">Реклама</h1>
      <p className="mb-2">
        Perec.news предлагает уникальный формат размещения рекламы — остроумный,
        креативный и запоминающийся.
      </p>
      <p className="mb-2">
        Мы открыты к сотрудничеству с брендами, которые ценят юмор и
        оригинальный подход.
      </p>
      <p className="mb-2">
        📧 По вопросам размещения рекламы:{" "}
        <a
          href="mailto:ads@perec.news"
          className="text-orange-700 hover:underline"
        >
          ads@perec.news
        </a>
      </p>
    </main>
  );
}
