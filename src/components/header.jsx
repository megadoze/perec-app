"use client";

// import dynamic from "next/dynamic";
import Link from "next/link";
import BurgerMenu from "./burgerMenu";

export default function Header() {
  return (
    <header className="h-[64px] px-4 md:px-8 py-4 flex items-center justify-between text-sm">
      <Link
        href="/"
        className="text-xl lg:text-2xl font-narrow font-bold tracking-tight"
      >
        <span className=" bg-red-600 text-white px-2 py-1 tracking-wide">
          PEREC
        </span>
      </Link>
      <BurgerMenu />
    </header>
  );
}
