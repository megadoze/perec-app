"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import BurgerMenu from "./burgerMenu";
import ThemeToggle from "./themeToggle";

export default function Header() {
  const locale = useLocale();

  return (
    <header className="h-[64px] px-4 md:px-8 py-4 flex items-center justify-between text-sm">
      <Link
        href={`/${locale}`}
        aria-label="На главную"
        className="text-3xl md:text-4xl font-blackout bg-white text-red-500 hover:text-red-600 transition-colors"
        style={{ lineHeight: "0.9" }}
      >
        PEREC
      </Link>
      <div className=" flex items-center gap-10">
        <ThemeToggle />
        <BurgerMenu />
      </div>
    </header>
  );
}
