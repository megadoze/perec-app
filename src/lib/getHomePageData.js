import { unstable_cache } from "next/cache";
import {
  db,
  ref,
  get,
  child,
  query,
  orderByChild,
  limitToLast,
} from "@/lib/firebase";

export const getHomePageData = unstable_cache(
  async (locale) => {
    const [newsSnapshot, mainSnapshot] = await Promise.all([
      get(
        query(
          child(ref(db), "news"),
          orderByChild("publishedAt"),
          limitToLast(100)
        )
      ),
      get(child(ref(db), "main_news")),
    ]);

    const newsData = newsSnapshot.exists() ? newsSnapshot.val() : {};
    const mainData = mainSnapshot.exists() ? mainSnapshot.val() : {};

    const categories = [
      "politics",
      "economics",
      "life",
      "culture",
      "media",
      "bezkupur",
    ];

    const newsByCategory = Object.fromEntries(
      categories.map((cat) => [cat, []])
    );

    // 📦 Заполняем по категориям
    for (const [id, item] of Object.entries(newsData)) {
      const t = item.translations?.[locale];
      if (item.status !== "published" || !t?.title?.trim()) continue;

      const simplified = {
        _id: id,
        category: item.category,
        images: item.images?.slice(0, 1),
        translations: {
          [locale]: {
            slug: t.slug,
            title: t.title,
            subTitle: t.subTitle,
          },
        },
        publishedAt: item.publishedAt,
      };

      if (newsByCategory[item.category]) {
        newsByCategory[item.category].push(simplified);
      }
    }

    // 🎯 Главные новости
    const mainNews = Object.entries(mainData)
      .map(([id, item]) => {
        const t = item.translations?.[locale];
        return {
          _id: id,
          category: item.category,
          images: item.images?.slice(0, 1),
          translations: {
            [locale]: {
              slug: t?.slug,
              title: t?.title,
              subTitle: t?.subTitle,
            },
          },
          order: item.order ?? 0,
        };
      })
      .filter((item) => item.translations?.[locale]?.title?.trim())
      .sort((a, b) => a.order - b.order)
      .slice(0, 5);

    // 🧹 Удаляем дубли из категорий
    const mainNewsIds = new Set(mainNews.map((n) => n._id));

    for (const cat of categories) {
      const limit = ["life", "culture"].includes(cat) ? 6 : 4;
      newsByCategory[cat] = newsByCategory[cat]
        .filter((item) => !mainNewsIds.has(item._id))
        .sort((a, b) => b.publishedAt - a.publishedAt)
        .slice(0, limit);
    }

    return { newsByCategory, mainNews };
  },
  ["home-page-data"],
  { tags: ["home"], revalidate: 300 }
);

// // lib/getHomePageData.js
// import { unstable_cache } from "next/cache";
// import { db, ref, get, child } from "@/lib/firebase";

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
//         return item.status === "published" && t?.title?.trim();
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
