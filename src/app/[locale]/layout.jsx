import "@/app/globals.css";

import { blackout2am } from "@/fonts/blackout";
import { PT_Sans_Narrow, Roboto_Condensed } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

const ptsansNarrow = PT_Sans_Narrow({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-ptsans-narrow",
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "700"],
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

  const common = (await import(`@/lang/${locale}/common.json`)).default;
  const about = (await import(`@/lang/${locale}/about.json`)).default;
  const ads = (await import(`@/lang/${locale}/ads.json`)).default;
  const contacts = (await import(`@/lang/${locale}/contacts.json`)).default;
  const authors = (await import(`@/lang/${locale}/authors.json`)).default;

  const messages = {
    ...common,
    ...about,
    ...ads,
    ...contacts,
    ...authors,
  };

  return (
    <html
      lang={locale}
      className={`${blackout2am.variable} ${ptsansNarrow.variable} ${robotoCondensed.variable} min-h-screen flex flex-col`}
    >
      <head>
        <base href="/" />
        <meta
          name="google-site-verification"
          content="8LTXtEFH_48BWqVY1lWd-DfTpWijIm_wmUzw5ME260s"
        />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link
          rel="dns-prefetch"
          href="https://firebasestorage.googleapis.com"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href={`https://perec.news/${locale}`} />
      </head>
      <body className="bg-white text-black font-sans flex flex-col min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="px-4 md:px-8 pt-4 md:pt-8 flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
