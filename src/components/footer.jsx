"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { FaFacebook, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("footer");

  const links = [
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/authors`, label: t("authors") },
    { href: `/${locale}/ads`, label: t("ads") },
    { href: `/${locale}/contacts`, label: t("contacts") },
  ];

  const normalizePath = (path) => path.replace(/\/$/, "");

  const telegramUrl = {
    ru: "https://t.me/perecnews",
    en: "https://t.me/perecnews_en",
  };

  return (
    <footer className="mt-10 px-4 md:px-8 pb-6 pt-14 text-neutral-800 dark:text-gray-300">
      <div className="mx-auto flex flex-col items-center gap-8 text-center border-t border-stone-100 dark:border-gray-800">
        <div className="flex flex-wrap justify-center gap-8 tracking-wide pt-10">
          {links.map((link) => {
            const isActive =
              normalizePath(pathname) === normalizePath(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-red-600 hover:dark:text-red-500 transition-colors ${
                  isActive ? "text-red-600" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="flex gap-6">
          <Link
            href="https://www.facebook.com/profile.php?id=61576829492064"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook className="text-red-600 text-3xl transition-transform duration-500 ease-in-out hover:text-red-500" />
          </Link>
          <Link
            href={telegramUrl[locale]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <FaTelegramPlane className="text-red-600 text-3xl transition-transform duration-500 ease-in-out hover:text-red-500" />
          </Link>
        </div>

        <div className="pt-0 text-neutral-600 dark:text-gray-400 font-light text-sm">
          © {new Date().getFullYear()} {t("rights")}
        </div>
      </div>
    </footer>
  );
}
