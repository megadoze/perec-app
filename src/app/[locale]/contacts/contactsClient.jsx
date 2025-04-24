"use client";

import { useTranslations } from "next-intl";

export default function ContactsClient() {
  const t = useTranslations("");

  return (
    <main className="mt-10 max-w-3xl mx-auto px-4 pb-16 font-light text-lg">
      <h1 className="text-2xl lg:text-3xl mb-6 font-normal">{t("contacttitle")}</h1>
      <p className="mb-2 font-light">{t("contactdescription")}</p>
      <p className="mb-2 font-light">
        Email:{" "}
        <a href="mailto:contact@perec.news" className="text-red-600">
          {t("contactemail")}
        </a>
      </p>
      <p className="font-light">
        Telegram:{" "}
        <a href="https://t.me/perecnews" className="text-red-600">
          {t("contacttelegram")}
        </a>
      </p>
    </main>
  );
}
