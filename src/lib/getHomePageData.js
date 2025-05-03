// lib/getHomePageData.js
// import { unstable_cache } from "next/cache";
import { db, ref, get, child } from "@/lib/firebase";

export async function getHomePageData(locale) {
  const [newsSnapshot, mainSnapshot] = await Promise.all([
    get(child(ref(db), "news")),
    get(child(ref(db), "main_news")),
  ]);

  const newsData = newsSnapshot.exists() ? newsSnapshot.val() : {};
  const mainData = mainSnapshot.exists() ? mainSnapshot.val() : {};

  const news = Object.entries(newsData)
    .map(([id, item]) => ({ _id: id, ...item }))
    .filter((item) => {
      const t = item.translations?.[locale];
      return (
        item.status === "published" && t?.title?.trim() && t?.content?.trim()
      );
    })
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .slice(0, 100);

  const mainNews = Object.entries(mainData)
    .map(([id, item]) => ({ _id: id, ...item }))
    .filter((item) => {
      const t = item.translations?.[locale];
      return t?.title?.trim() && t?.content?.trim();
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, 5);

  return { news, mainNews };
}

// export const getHomePageData = unstable_cache(
//   async (locale) => {
//     const [newsSnapshot, mainSnapshot] = await Promise.all([
//       get(child(ref(db), "news")),
//       get(child(ref(db), "main_news")),
//     ]);

//     const newsData = newsSnapshot.exists() ? newsSnapshot.val() : {};
//     const mainData = mainSnapshot.exists() ? mainSnapshot.val() : {};

//     const news = Object.entries(newsData)
//       .map(([id, item]) => ({ _id: id, ...item }))
//       .filter((item) => {
//         const t = item.translations?.[locale];
//         return (
//           item.status === "published" && t?.title?.trim() && t?.content?.trim()
//         );
//       })
//       .sort((a, b) => b.publishedAt - a.publishedAt)
//       .slice(0, 100);

//     const mainNews = Object.entries(mainData)
//       .map(([id, item]) => ({ _id: id, ...item }))
//       .filter((item) => {
//         const t = item.translations?.[locale];
//         return t?.title?.trim() && t?.content?.trim();
//       })
//       .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
//       .slice(0, 5);

//     return { news, mainNews };
//   },
//   ["home-page-data"],
//   { tags: ["home"], revalidate: 300 }
// );
