export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function OGTestPage() {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <title>🔥 Тестовое превью для Telegram</title>

        {/* Open Graph */}
        <meta property="og:title" content="🔥 Тестовое превью для Telegram" />
        <meta
          property="og:description"
          content="Если ты это видишь, значит Telegram наконец-то работает!"
        />
        <meta property="og:image" content="https://i.imgur.com/gXCbQTn.jpeg" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://perec.news/og-test" />
        <meta property="og:site_name" content="PEREC.news" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Тестовое превью" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="🔥 Тестовое превью для Telegram" />
        <meta
          name="twitter:description"
          content="Проверь, отображается ли это в Telegram"
        />
        <meta name="twitter:image" content="https://i.imgur.com/gXCbQTn.jpeg" />

        {/* Redirect */}
        <meta httpEquiv="refresh" content="3;url=/" />
      </head>
      <body>
        <p>Редирект на главную через 3 секунды...</p>
      </body>
    </html>
  );
}
