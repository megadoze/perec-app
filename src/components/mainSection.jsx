// components/mainSection.jsx (без "use client")
import MainLayout from "./mainLayout";

export default function MainSection({ mainNews, bezkupur, locale, theme }) {
  return (
    <MainLayout
      news={mainNews}
      bezkupur={bezkupur}
      locale={locale}
      theme={theme}
    />
  );
}
