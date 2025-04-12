import "@mantine/core/styles.css";
import "./globals.css";

import { MantineProvider } from "@mantine/core";
import Link from "next/link";
import BurgerMenu from "@/components/burgerMenu";
import { PT_Sans_Narrow, Roboto_Condensed } from "next/font/google";

const ptsansNarrow = PT_Sans_Narrow({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-ptsans-narrow",
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-roboto-condensed",
  display: "swap",
});

export const metadata = {
  title: "PEREC.news - нескучные новости🔥",
  description:
    "Бросаем вызов традиционным медиа, делая новости не только информативными, но и захватывающе интересными!",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${ptsansNarrow.variable} ${robotoCondensed.variable} min-h-screen flex flex-col`}
    >
      <head>
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link
          rel="dns-prefetch"
          href="https://firebasestorage.googleapis.com"
        />
      </head>
      <body className=" bg-[#faf8f5] text-black font-sans flex flex-col min-h-screen">
        <MantineProvider
          theme={{
            fontFamily: "var(--font-roboto-condensed)",
            headings: { fontFamily: "var(--font-ptsans-narrow)" },
          }}
        >
          <header className="h-[64px] px-5 md:px-8 py-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold tracking-tight">
                Perec News
              </Link>
            </div>
            <div className="flex justify-end items-center gap-4">
              <button className="hidden md:block bg-black text-white px-3 py-1 rounded hover:opacity-80">
                Get 1 year for $50 USD
              </button>
              <BurgerMenu />
              {/* <Link href="/login" className="hidden md:block text-lg"> */}
              {/* <p className="hidden md:block text-lg">Login</p> */}
              {/* </Link> */}
              {/* <button className="md:hidden text-lg">☰</button> */}
            </div>
          </header>

          <main className="px-5 md:px-8 pt-5 md:pt-10 flex-1">{children}</main>

          <footer className="mt-12 text-center text-neutral-400 text-sm pb-8">
            © {new Date().getFullYear()} Perec News. All rights reserved.
          </footer>
        </MantineProvider>
      </body>
    </html>
  );
}
