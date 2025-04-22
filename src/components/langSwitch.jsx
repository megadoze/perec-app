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
            className={` w-7 text-center font-light  ${
              locale === currentLocale
                ? "  text-white bg-red-500 decoration-red-500"
                : ""
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
