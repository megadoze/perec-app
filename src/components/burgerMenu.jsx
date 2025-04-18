"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./langSwitch";

export default function BurgerMenu() {
  const locale = useLocale();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden"; // блокируем прокрутку
    } else {
      document.body.style.overflow = "";
    }

    // Очистка при размонтировании
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

      {/* Фон и панель с анимацией */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
          opened
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpened(false)} // клик вне панели
      >
        <div
          className={`transition-all duration-300 transform ${
            opened ? "translate-x-0" : "translate-x-full"
          } w-full md:w-[360px] h-full bg-white p-6 ml-auto`}
          onClick={(e) => e.stopPropagation()} // чтобы не закрывалось при клике внутри
        >
          <div className="relative">
            <button
              className="absolute top-0 right-0 text-xl text-zinc-600"
              onClick={() => setOpened(false)}
              aria-label="Закрыть меню"
            >
              ✕
            </button>

            <nav className="flex flex-col gap-4 text-lg pt-10">
              <Link href={`/${locale}`} onClick={() => setOpened(false)}>
                Главная
              </Link>
              <Link
                href={`/${locale}/politics`}
                onClick={() => setOpened(false)}
              >
                Политический перчик
              </Link>
              <Link
                href={`/${locale}/economics`}
                onClick={() => setOpened(false)}
              >
                Экономика с огоньком
              </Link>
              <Link href={`/${locale}/life`} onClick={() => setOpened(false)}>
                Жизнь острая как чили
              </Link>
              <Link href={`/${locale}/culture`} onClick={() => setOpened(false)}>
                Поп-культура в перце
              </Link>
              <Link
                href={`/${locale}/bezkupur`}
                onClick={() => setOpened(false)}
              >
                Без купюр
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
