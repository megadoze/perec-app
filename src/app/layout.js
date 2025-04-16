import "./globals.css";

import { PT_Sans_Narrow, Roboto_Condensed } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

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

export const metadata = {
  title: "PEREC.news - нескучные новости🔥",
  description:
    "Бросаем вызов традиционным медиа, делая новости не только информативными, но и захватывающе интересными!",
  icons: {
    icon: "/fav-red.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ru"
      className={`${ptsansNarrow.variable} ${robotoCondensed.variable} min-h-screen flex flex-col`}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link
          rel="dns-prefetch"
          href="https://firebasestorage.googleapis.com"
        />
      </head>
      <body className=" bg-white text-black font-sans flex flex-col min-h-screen">
        <Header />
        <main className="px-4 md:px-8 pt-5 md:pt-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
