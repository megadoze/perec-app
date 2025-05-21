import "@/app/globals.css";

import { headers } from "next/headers";

import { blackout2am } from "@/fonts/blackout";
import { PT_Sans_Narrow, Roboto_Condensed } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import ThemeInitializer from "@/components/themeInitializer";
import Header from "@/components/header";
import Footer from "@/components/footer";
// RU
import commonRu from "@/lang/ru/common.json";
import aboutRu from "@/lang/ru/about.json";
import adsRu from "@/lang/ru/ads.json";
import contactsRu from "@/lang/ru/contacts.json";
import authorsRu from "@/lang/ru/authors.json";

// EN
import commonEn from "@/lang/en/common.json";
import aboutEn from "@/lang/en/about.json";
import adsEn from "@/lang/en/ads.json";
import contactsEn from "@/lang/en/contacts.json";
import authorsEn from "@/lang/en/authors.json";

const ptsansNarrow = PT_Sans_Narrow({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-ptsans-narrow",
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto-condensed",
  display: "swap",
});

// ✅ Статичная metadata — теперь возможно SSG

export const metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }];
}

const locales = ["ru", "en"];

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  // ✅ Надёжно получаем тему из cookie-заголовка
  const header = await headers();
  const cookieHeader = header.get("cookie") || "";
  const themeMatch = cookieHeader.match(/theme=(dark|light)/);

  let theme;

  if (themeMatch?.[1]) {
    theme = themeMatch[1];
  } else {
    const now = new Date();
    const utcHour = now.getUTCHours();
    const localHour = (utcHour + 2) % 24; // Испания
    const isNight = localHour >= 20 || localHour < 7;
    theme = isNight ? "dark" : "light";
  }

  const messages =
    locale === "ru"
      ? { ...commonRu, ...aboutRu, ...adsRu, ...contactsRu, ...authorsRu }
      : { ...commonEn, ...aboutEn, ...adsEn, ...contactsEn, ...authorsEn };

  return (
    <html
      lang={locale}
      className={`${theme === "dark" ? "dark" : ""} ${blackout2am.variable} ${
        ptsansNarrow.variable
      } ${robotoCondensed.variable} min-h-screen flex flex-col`}
    >
      <body className=" bg-white text-black dark:bg-gray-900 dark:text-gray-100 font-sans flex flex-col min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <ThemeInitializer />
          <main className="px-4 md:px-8 pt-4 md:pt-8 flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
