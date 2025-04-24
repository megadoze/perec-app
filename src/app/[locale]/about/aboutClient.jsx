"use client";

import { useTranslations } from "next-intl";

export default function AboutClient() {
  const t = useTranslations("");
  const points = t.raw("audiencePoints");
  const sections = t.raw("sectionsList");

  return (
    <section className="mt-10 max-w-3xl mx-auto px-4 pb-16 font-light text-lg">
      <h1 className="text-2xl lg:text-3xl mb-6 font-normal">{t("heading")}</h1>
      <p className="mb-4">{t("paragraph1")}</p>
      <p className="mb-4 font-normal">{t("paragraph2")}</p>
      <p className="mb-4 font-normal">{t("paragraph3")}</p>
      <p className="mb-4">{t("paragraph4")}</p>

      <h2 className="text-2xl font-normal mt-8 mb-4">{t("audience")}</h2>
      <ul className="list-disc pl-5 space-y-2">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-normal mt-8 mb-4">{t("sections")}</h2>
      <ul className="list-disc pl-5 space-y-2">
        {sections.map((s, i) => (
          <li key={i}>
            <strong>{s.title}</strong> {s.text}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-normal mt-8 mb-4">{t("mission")}</h2>
      <p>{t("missionText")}</p>
    </section>
  );
}
