"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function BackButton({ params }) {
  const router = useRouter();

  const locale = useLocale();

  const butName = {
    ru: "Назад",
    en: "Back",
  };

  return (
    <button
      onClick={() => {
        if (window.history.length > 2) {
          router.back();
        } else {
          router.push("/");
        }
      }}
      className="inline-flex items-center gap-1 mt-6 text-cyan-700/60 dark:text-cyan-700"
    >
      <span className="pb-1">←</span>
      <span>{butName[locale]}</span>
    </button>
  );
}
