"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";

const locales = ["ru", "en"];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale();

  return (
    <div className="flex gap-2">
      {locales.map((locale) => {
        // Заменяем текущий locale в пути на новый
        const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);

        return (
          <Link
            key={locale}
            href={newPath}
            className={`px-1 py-0 text-base font-light  ${
              locale === currentLocale
                ? "bg-red-600 text-white"
                : "text-red-600 border-red-600"
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
