// app/components/Header.tsx
"use client";

// import dynamic from "next/dynamic";
import Link from "next/link";

// const BurgerMenu = dynamic(() => import("./burgerMenu"), {
//   ssr: false,
//   loading: () => null,
// });

export default function Header() {
  return (
    <header className="h-[64px] px-3 md:px-8 py-4 flex items-center justify-between text-sm">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-2xl font-bold  font-narrow tracking-tight"
        >
          Perec News
        </Link>
      </div>
      {/* <div className="flex justify-end items-center gap-4">
        <BurgerMenu />
      </div> */}
    </header>
  );
}
