"use client";

// import dynamic from "next/dynamic";
import Link from "next/link";
import BurgerMenu from "./burgerMenu";

export default function Header() {
  return (
    <header className="h-[64px] px-3 md:px-8 py-4 flex items-center justify-between text-sm">
      <Link href="/" className="text-2xl font-bold  font-narrow tracking-tight">
        Perec News
      </Link>
      <BurgerMenu />
    </header>
  );
}
