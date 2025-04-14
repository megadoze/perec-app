"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="mt-10 px-3 md:px-8 pb-6 pt-14 text-neutral-600 text-sm">
      <div className=" mx-auto flex flex-col items-center gap-8 text-center border-t">
        <div className="flex flex-wrap justify-center gap-8 text-base font-medium tracking-wide pt-10">
          <Link
            href="/about"
            className={`hover:text-orange-700 transition ${
              pathname === "/about" ? "text-orange-700 font-semibold" : ""
            }`}
          >
            О нас
          </Link>
          <Link
            href="/contacts"
            className={`hover:text-orange-700 transition ${
              pathname === "/contacts" ? "text-orange-700 font-semibold" : ""
            }`}
          >
            Контакты
          </Link>
          <Link
            href="/ads"
            className={`hover:text-orange-700 transition ${
              pathname === "/ads" ? "text-orange-700 font-semibold" : ""
            }`}
          >
            Реклама
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <FaTelegramPlane size={22} />
          </a>
        </div>

        <div className=" pt-0 text-neutral-500 text-xs">
          © {new Date().getFullYear()} Perec News. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
