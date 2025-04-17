"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="mt-10 px-4 md:px-8 pb-6 pt-14 text-neutral-600 text-sm">
      <div className=" mx-auto flex flex-col items-center gap-8 text-center border-t border-stone-100">
        <div className="flex flex-wrap justify-center gap-8 text-base font-medium tracking-wide pt-10">
          <Link
            href="/about"
            className={`hover:text-red-600 transition ${
              pathname === "/about" ? "text-red-600 " : ""
            }`}
          >
            О нас
          </Link>
          <Link
            href="/ads"
            className={`hover:text-red-600 transition ${
              pathname === "/ads" ? "text-red-600 " : ""
            }`}
          >
            Реклама
          </Link>
          <Link
            href="/contacts"
            className={`hover:text-red-600 transition ${
              pathname === "/contacts" ? "text-red-600" : ""
            }`}
          >
            Контакты
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perec News в Facebook"
            title="Perec News в Facebook"
            className="hover:text-red-600 text-gray-800"
          >
            <FaFacebookF size={20} />
          </a>

          <a
            href="https://t.me/perecnews"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perec News в Telegram"
            title="Perec News в Telegram"
            className="hover:text-red-600 text-gray-800"
          >
            <FaTelegramPlane size={22} />
          </a>
        </div>

        <div className=" pt-0 text-neutral-600 font-light text-sm">
          © {new Date().getFullYear()} Perec News. Все права защищены
        </div>
      </div>
    </footer>
  );
}
