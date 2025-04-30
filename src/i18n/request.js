import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "../../next-intl.config.mjs";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? defaultLocale;

  // Предотвращаем ошибку при undefined
  try {
    return {
      locale: resolvedLocale,
      messages: {
        ...(await import(`../lang/${resolvedLocale}/common.json`)).default,
        ...(await import(`../lang/${resolvedLocale}/about.json`)).default,
        ...(await import(`../lang/${resolvedLocale}/ads.json`)).default,
        ...(await import(`../lang/${resolvedLocale}/contacts.json`)).default,
      },
    };
  } catch (error) {
    console.error(
      "❌ Error loading translations for locale:",
      resolvedLocale,
      error
    );
    throw error;
  }
});
