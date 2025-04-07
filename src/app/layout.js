import "./globals.css";

export const metadata = {
  title: "PEREC.news - нескучные новости!🔥",
  description:
    "Бросаем вызов традиционным медиа, делая новости не только информативными, но и захватывающе интересными!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-black text-white p-4">
          <h1 className="text-xl font-bold">📰 Новости</h1>
        </header>

        <main className="max-w-3xl mx-auto p-4">{children}</main>

        <footer className="text-center text-sm text-gray-500 py-4">
          &copy; {new Date().getFullYear()} Все права защищены
        </footer>
      </body>
    </html>
  );
}
