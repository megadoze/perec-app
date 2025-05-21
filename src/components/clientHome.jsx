import Link from "next/link";
import LazyCategoryFourH from "./lazyCategoryFourH";
import LazyCategorySix from "./lazyCategorySix";
import LazyCategorySixV from "./lazyCategorySixV";
import LazyCategoryMediaFour from "./lazyCategoryMediaFour";

export default function ClientHome({
  politics,
  economics,
  life,
  culture,
  media,
  theme,
  locale,
  t,
}) {
  return (
    <>
      <h1 className="sr-only">
        {locale === "ru"
          ? "Острые новости, мемы, ирония и безжалостная правда — Perec.news приправляет инфополе"
          : "Spicy news, memes, irony, and merciless truth — Perec.news seasons your feed"}
      </h1>

      <div className="my-6 border-t border-neutral-100 dark:border-gray-800" />
      <h2 className="font-narrow text-2xl pb-6 text-red-600 dark:text-red-500">
        <Link href={`/${locale}/politics`}>{t.politics}</Link>
      </h2>

      <LazyCategoryFourH
        news={politics}
        withText
        locale={locale}
        theme={theme}
      />

      <div className="my-6 border-t border-neutral-100 dark:border-gray-800" />
      <h2 className="font-narrow text-2xl pb-6 text-red-600 dark:text-red-500">
        <Link href={`/${locale}/economics`}>{t.economics}</Link>
      </h2>
      <LazyCategoryFourH
        news={economics}
        withPhoto
        withText
        locale={locale}
        theme={theme}
      />

      <div className="my-6 border-t border-neutral-100 dark:border-gray-800" />
      <h2 className="font-narrow text-2xl pb-6 text-red-600 dark:text-red-500">
        <Link href={`/${locale}/life`}>{t.life}</Link>
      </h2>
      <LazyCategorySix
        news={life}
        withPhoto
        withText
        locale={locale}
        theme={theme}
      />

      <div className="my-6 border-t border-neutral-100 dark:border-gray-800" />
      <h2 className="font-narrow text-2xl pb-6 text-red-600 dark:text-red-500">
        <Link href={`/${locale}/culture`}>{t.culture}</Link>
      </h2>
      <LazyCategorySixV news={culture} locale={locale} theme={theme} />

      <div className="my-6 border-t border-neutral-100 dark:border-gray-800" />
      <h2 className="font-narrow text-2xl pb-6 text-red-600 dark:text-red-500">
        <Link href={`/${locale}/media`}>{t.media}</Link>
      </h2>
      <LazyCategoryMediaFour
        news={media}
        withPhoto
        locale={locale}
        theme={theme}
      />
    </>
  );
}