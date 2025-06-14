"use client";

import { useEffect, useRef } from "react";

export default function TelegramBannerClient() {
  const hasShown = useRef(false);

  useEffect(() => {
    const banner = document.getElementById("telegram-banner");
    const closeButton = document.getElementById("close-banner");

    const showBanner = () => {
      banner.classList.add("opacity-100", "pointer-events-auto");
    };

    const hideBanner = () => {
      banner.classList.remove("opacity-100", "pointer-events-auto");
    };

    const handleScroll = () => {
      const scrollPosition =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);

      if (scrollPosition > 0.5 && !hasShown.current) {
        showBanner();
        hasShown.current = true;

        // ❗ Удаляем обработчик сразу после показа, чтобы больше не срабатывал
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    closeButton.addEventListener("click", hideBanner);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      closeButton.removeEventListener("click", hideBanner);
    };
  }, []);

  return (
    <div
      id="telegram-banner"
      className="fixed top-4 left-4 right-4 md:left-auto md:right-8 md:top-8 bg-black text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between transition-opacity duration-500 opacity-100 pointer-events-none z-50"
    >
      <span className="text-base font-medium text-white">
        🌶️ Подписывайся на наш{" "}
        <a
          href="https://t.me/perecnews"
          target="_blank"
          className="!text-red-500 underline"
        >
          Telegram
        </a>{" "}
        — острое, честное, без цензуры.
      </span>
      <button
        id="close-banner"
        className="ml-4 text-white text-xl leading-none hover:text-gray-400"
      >
        ×
      </button>
    </div>
  );
}
