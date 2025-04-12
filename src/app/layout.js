// import "@mantine/core/styles.css";
import "./globals.css";

// import { MantineProvider } from "@mantine/core";
// import Link from "next/link";
// import BurgerMenu from "@/components/burgerMenu";
import { PT_Sans_Narrow, Roboto_Condensed } from "next/font/google";
import Header from "@/components/header";

const ptsansNarrow = PT_Sans_Narrow({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-ptsans-narrow",
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["cyrillic", "latin"],
  weight: ["300"],
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
        {/* <MantineProvider
          theme={{
            fontFamily: "var(--font-roboto-condensed)",
            headings: { fontFamily: "var(--font-ptsans-narrow)" },
          }}
        > */}
        <Header />
        <main className="px-3 md:px-8 pt-5 md:pt-10 flex-1">{children}</main>

        <footer className="mt-12 text-center text-neutral-400 text-sm pb-8">
          © {new Date().getFullYear()} Perec News. All rights reserved.
        </footer>
        {/* </MantineProvider> */}
      </body>
    </html>
  );
}
