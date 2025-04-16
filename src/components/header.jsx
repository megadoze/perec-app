"use client";

// import dynamic from "next/dynamic";
import Link from "next/link";
import BurgerMenu from "./burgerMenu";

export default function Header() {
  return (
    <header className="h-[64px] px-4 md:px-8 py-4 flex items-center justify-between text-sm">
      <Link href="/" className="text-xl lg:text-2xl font-blackout ">
        {/* <span className=" bg-red-600 text-white px-2 py-1 tracking-wide">
          PEREC
        </span> */}
        {/* <img src="/perec_logo.png" alt="" className=" w-20"/> */}
        <img src="/logo.png" alt="" className="" />
        {/* <p
          className="  px-2 py-1 font-semibold font-blackout"
          style={{
            fontFamily: '"Blackout 2AM", sans-serif',
            fontSize: "30px",
            fontWeight: "normal",
            textTransform: "uppercase",
            lineHeight: 1,
            letterSpacing: "0px",
            color: "#d41d1d"
          }}
        >
          PEREC
        </p> */}
      </Link>
      <BurgerMenu />
    </header>
  );
}
