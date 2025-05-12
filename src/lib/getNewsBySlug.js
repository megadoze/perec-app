// lib/api/getNewsBySlug.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { firebaseConfig } from "@/config/firebase";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function getNewsBySlug(slug, locale = "ru") {
  const snapshot = await get(ref(db, `news`));

  if (!snapshot.exists()) return null;

  const allNews = snapshot.val();
  const list = Object.values(allNews);

  const match = list.find((item) => {
    const translation = item.translations?.[locale];
    return (
      item.category === "media" &&
      item.status === "published" &&
      translation?.slug === slug
    );
  });

  return match || null;
}
