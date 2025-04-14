"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="mt-10 px-4 md:px-8 pb-6 pt-14 text-neutral-600 text-sm">
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
            href="/ads"
            className={`hover:text-orange-700 transition ${
              pathname === "/ads" ? "text-orange-700 font-semibold" : ""
            }`}
          >
            Реклама
          </Link>
          <Link
            href="/contacts"
            className={`hover:text-orange-700 transition ${
              pathname === "/contacts" ? "text-orange-700 font-semibold" : ""
            }`}
          >
            Контакты
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="https://facebook.com" target="_blank">
            <FaFacebookF
              size={20}
              className="text-gray-600 hover:text-orange-700"
            />
          </Link>
          <Link href="https://t.me" target="_blank">
            <FaTelegramPlane
              size={22}
              className="text-gray-600 hover:text-orange-700"
            />
          </Link>
        </div>

        <div className=" pt-0 text-neutral-600 text-sm">
          © {new Date().getFullYear()} Perec News. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
