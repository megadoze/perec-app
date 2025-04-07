import Link from "next/link";
import { PT_Sans, PT_Sans_Narrow } from "next/font/google";
import "./globals.css";

const ptsans = PT_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-ptsans",
  display: "swap",
});

const ptsansNarrow = PT_Sans_Narrow({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-ptsans-narrow",
  display: "swap",
});

export const metadata = {
  title: "PEREC.news - нескучные новости!🔥",
  description:
    "Бросаем вызов традиционным медиа, делая новости не только информативными, но и захватывающе интересными",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ptsans.variable} ${ptsansNarrow.variable}`}>
      <body className="bg-[#faf8f5] text-black font-sans">
        <header className="border-b border-neutral-300 px-10 py-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Perec News
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <button className="bg-black text-white px-3 py-1 rounded hover:opacity-80">
              Get 1 year for $50 USD
            </button>
            <button className="md:hidden text-sm">☰</button>
          </div>
        </header>

        <main className="px-6 py-8">{children}</main>

        <footer className="mt-12 text-center text-neutral-400 text-sm pb-8">
          © {new Date().getFullYear()} Perec News. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
