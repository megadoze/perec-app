"use client";

import { useTranslations } from "next-intl";

export default function AdsClient() {
  const t = useTranslations("");

  return (
    <section className="max-w-3xl mx-auto px-4 pb-16 font-light text-lg">
      <h1 className="text-3xl mb-6 font-normal">{t("adstitle")}</h1>
      <p className="mb-4">{t("adsdescription")}</p>
      <p className="mb-2 font-light">
        Email:{" "}
        <a href="mailto:contact@perec.news" className="text-red-600">
          {t("adsemail")}
        </a>
      </p>
    </section>
  );
}
