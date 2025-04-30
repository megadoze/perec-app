"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";

const locales = ["ru", "en"];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLocaleChange = async (locale) => {
    const segments = pathname.split("/");
    const currentSlug = segments.at(-1);

    // Проверка: содержит ли slug хотя бы один дефис + id
    if (!currentSlug.includes("-")) {
      // Если не на странице новости — просто меняем locale в path
      const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
      router.push(newPath);
      return;
    }

    const id = currentSlug.split("-").at(-1);

    try {
      const res = await fetch(`/api/news-slug?id=${id}&locale=${locale}`);
      const data = await res.json();

      if (res.ok) {
        const newPath = `/${locale}/${data.category}/${data.slug}-${id}`;
        router.push(newPath);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Ошибка при переключении языка", err);
    }
  };

  return (
    <div className="flex gap-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          className={`w-7 text-center font-light ${
            locale === currentLocale
              ? "text-white bg-red-500 decoration-red-500"
              : ""
          }`}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
