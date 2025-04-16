import { FaTelegramPlane } from "react-icons/fa";

const TelegramBanner = () => {
  return (
    <a
      href="https://t.me/perecnews"
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-dashed border-red-500  transition-colors">
        <div className="text-lg font-medium">
          Подписывайся на наш <br />
          <span className="font-bold font-narrow text-xl">Telegram-канал</span>
        </div>
        <FaTelegramPlane className="text-red-500 text-3xl transition-transform duration-200 group-hover:rotate-[360deg]" />
      </div>
    </a>
  );
};

export default TelegramBanner;
