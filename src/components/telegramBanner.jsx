"use client";

import { useLocale } from "next-intl";
import { FaTelegramPlane } from "react-icons/fa";

const TelegramBanner = () => {
  const locale = useLocale();

  const telegramUrl = {
    ru: "https://t.me/perecnews",
    en: "https://t.me/perecnews_en",
  };

  const titleTelegram = {
    ru: (
      <div className="text-lg font-medium">
        Подписывайся на наш <br />
        <span className="font-bold font-narrow text-xl tracking-wide">
          Telegram-канал
        </span>
      </div>
    ),
    en: (
      <div className="text-lg font-medium">
        Subscribe to our <br />
        <span className="font-bold font-narrow text-xl tracking-wide">
          Telegram-channel
        </span>
      </div>
    ),
  };

  return (
    <a
      href={telegramUrl[locale]}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-dashed border-red-500  transition-colors">
        {titleTelegram[locale]}
        <FaTelegramPlane className="text-red-500 text-3xl transition-transform duration-200 group-hover:rotate-[360deg]" />
      </div>
    </a>
  );
};

export default TelegramBanner;
