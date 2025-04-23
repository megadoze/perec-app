"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./langSwitch";

export default function BurgerMenu() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("categoryName"); // 👈 перевод категорий
  const [opened, setOpened] = useState(false);

  const parts = pathname.split("/");
  const category = parts[2] || null;

  useEffect(() => {
    document.body.style.overflow = opened ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      <button
        onClick={() => setOpened(true)}
        className="flex flex-col justify-center items-end w-6 h-6 gap-[6px]"
        aria-label="Открыть меню"
      >
        <span className="w-full h-[2px] bg-black"></span>
        <span className="w-2/3 h-[2px] bg-black"></span>
      </button>

      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
          opened
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpened(false)}
      >
        <div
          className={`transition-all duration-300 transform ${
            opened ? "translate-x-0" : "translate-x-full"
          } w-full md:w-[360px] h-full bg-white p-6 ml-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              className="absolute top-0 right-0 text-xl text-zinc-600"
              onClick={() => setOpened(false)}
              aria-label="Закрыть меню"
            >
              ✕
            </button>

            <nav className="flex flex-col gap-4 text-lg pt-10 font-light">
              <Link
                href={`/${locale}`}
                onClick={() => setOpened(false)}
                className={
                  category === null
                    ? "underline underline-offset-[6px] decoration-red-500 decoration-2"
                    : ""
                }
              >
                {t("home") || "Главная"}
              </Link>
              <Link
                href={`/${locale}/politics`}
                onClick={() => setOpened(false)}
                className={
                  category === "politics"
                    ? "underline underline-offset-[6px] decoration-red-500 decoration-2"
                    : ""
                }
              >
                {t("politics")}
              </Link>
              <Link
                href={`/${locale}/economics`}
                onClick={() => setOpened(false)}
                className={
                  category === "economics"
                    ? "underline underline-offset-[6px] decoration-red-500 decoration-2"
                    : ""
                }
              >
                {t("economics")}
              </Link>
              <Link
                href={`/${locale}/life`}
                onClick={() => setOpened(false)}
                className={
                  category === "life"
                    ? "underline underline-offset-[6px] decoration-red-500 decoration-2"
                    : ""
                }
              >
                {t("life")}
              </Link>
              <Link
                href={`/${locale}/culture`}
                onClick={() => setOpened(false)}
                className={
                  category === "culture"
                    ? "underline underline-offset-[6px] decoration-red-500 decoration-2"
                    : ""
                }
              >
                {t("culture")}
              </Link>
              <Link
                href={`/${locale}/bezkupur`}
                onClick={() => setOpened(false)}
                className={
                  category === "bezkupur"
                    ? "underline underline-offset-[6px] decoration-red-500 decoration-2"
                    : ""
                }
              >
                {t("bezkupur")}
              </Link>
            </nav>

            <div className="mt-6 text-lg">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
