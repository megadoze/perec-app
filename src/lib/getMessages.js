// lib/getMessages.js
export async function getMessages(locale) {
  switch (locale) {
    case "ru":
      return (await import("@/lang/ru/common.json")).default;
    case "en":
      return (await import("@/lang/en/common.json")).default;
    default:
      return {};
  }
}
