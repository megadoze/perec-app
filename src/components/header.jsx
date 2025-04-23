"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import BurgerMenu from "./burgerMenu";

export default function Header() {
  const locale = useLocale();

  return (
    <header className="h-[64px] px-4 md:px-8 py-4 flex items-center justify-between text-sm">
      <Link
        href={`/${locale}`}
        aria-label="На главную"
        className="text-xl lg:text-2xl font-blackout "
      >
        {/* <img src="/logo.webp" alt="perec logo" className=" w-20 md:w-24" /> */}
        <span className=" text-3xl md:text-4xl font-blackout text-red-500 hover:text-red-600 transition-colors">
          PEREC
        </span>
      </Link>
      <BurgerMenu />
    </header>
  );
}
