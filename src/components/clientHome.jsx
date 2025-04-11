"use client";

import { useEffect, useState, useMemo } from "react";
import { db, ref, onValue } from "@/lib/firebase";
import MainLayout from "./mainLayout";
import CategoryLayoutFourH from "./categoryLayoutFourH";
import CategoryLayoutFourV from "./categoryLayoutFourV";
import CategoryLayoutSix from "./categoryLayoutSix";
import { motion, AnimatePresence } from "framer-motion"; // <== добавим анимацию
import Link from "next/link";

export default function ClientHome({ initialNews }) {
  const [news, setNews] = useState(initialNews);

  useEffect(() => {
    const newsRef = ref(db, "news");

    const unsubscribe = onValue(newsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const fresh = Object.entries(data)
        .map(([id, item]) => ({ id, ...item }))
        .filter((item) => item.status === "published")
        .sort((a, b) => b.publishedAt - a.publishedAt)
        .slice(0, 25);

      setNews(fresh);
    });

    return () => unsubscribe();
  }, []);

  // 🔍 Оптимизация: фильтрация с useMemo
  const politics = useMemo(
    () => news.filter((item) => item.category === "politics").slice(0, 4),
    [news]
  );
  const economics = useMemo(
    () => news.filter((item) => item.category === "economics").slice(0, 4),
    [news]
  );
  const life = useMemo(
    () => news.filter((item) => item.category === "life").slice(0, 6),
    [news]
  );
  const culture = useMemo(
    () => news.filter((item) => item.category === "culture").slice(0, 6),
    [news]
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={news.length} // переключатель на изменение массива
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <MainLayout news={news} />
        <div className="my-6 border-t border-neutral-200"></div>

        <h2 className="font-sans text-xl pb-6 text-orange-700">
          <Link href="politics">Политический перчик</Link>
        </h2>
        <CategoryLayoutFourH news={politics} withText />

        <div className="my-6 border-t border-neutral-200"></div>
        <h2 className="font-sans text-xl pb-6 text-orange-700">
          <Link href="economics"> Экономика с огоньком</Link>
        </h2>
        <CategoryLayoutFourH news={economics} withPhoto withText />

        <div className="my-6 border-t border-neutral-200"></div>
        <h2 className="font-sans text-xl pb-6 text-orange-700">
          <Link href="life">Жизнь острая как чили</Link>
        </h2>
        <CategoryLayoutSix news={life} />

        <div className="my-6 border-t border-neutral-200"></div>
        <h2 className="font-sans text-xl pb-6 text-orange-700">
          <Link href="culture">Поп-культура с перцем</Link>
        </h2>
        <CategoryLayoutFourV news={culture} />
      </motion.div>
    </AnimatePresence>
  );
}
