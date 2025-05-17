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
      const limit =
        cat === "bezkupur" ? 3 : ["life", "culture"].includes(cat) ? 6 : 4;
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
