// lib/getMessages.js
export async function getMessages(locale) {
  switch (locale) {
    case "ru":
      const commonRu = await import("@/lang/ru/common.json");
      const authorsRu = await import("@/lang/ru/authors.json");
      const aboutRu = await import("@/lang/ru/about.json");
      const adsRu = await import("@/lang/ru/ads.json");
      const contactsRu = await import("@/lang/ru/contacts.json");
      return {
        ...commonRu.default,
        ...authorsRu.default,
        ...aboutRu.default,
        ...adsRu.default,
        ...contactsRu.default,
      };
    case "en":
      const commonEn = await import("@/lang/en/common.json");
      const authorsEn = await import("@/lang/en/authors.json");
      const aboutEn = await import("@/lang/en/about.json");
      const adsEn = await import("@/lang/en/ads.json");
      const contactsEn = await import("@/lang/en/contacts.json");
      return {
        ...commonEn.default,
        ...authorsEn.default,
        ...aboutEn.default,
        ...adsEn.default,
        ...contactsEn.default,
      };
    default:
      return {};
  }
}
