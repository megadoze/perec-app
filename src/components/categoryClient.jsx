"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryLayoutFourH from "./categoryLayoutFourH";
import CategoryLayoutSixV from "./categoryLayoutSixV";

const PAGE_SIZE = 8; // Количество новостей за одну подгрузку

export default function CategoryClient({ title, news, category }) {
  const locale = useLocale();
  const initial = news.slice(0, 6); // первые 6
  const extraAll = category === "bezkupur" ? news : news.slice(6);

  const [visibleCount, setVisibleCount] = useState(1); // сколько порций загружено
  const containerRef = useRef(null);

  const extraToShow = extraAll.slice(0, visibleCount * PAGE_SIZE);
  const hasMore = extraToShow.length < extraAll.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 1);
  };

  // 🔻 Скроллим к подгруженному блоку
  useEffect(() => {
    if (visibleCount > 1 && containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [visibleCount]);

  const emptyNewsTitle = {
    ru: "Нет новостей в этой категории",
    en: "There are no news in this category",
  };

  return (
    <div>
      <h1 className="text-2xl font-narrow text-red-600 mb-6">{title}</h1>

      {news.length === 0 && <p>{emptyNewsTitle[locale]}</p>}

      {initial.length > 0 && category !== "bezkupur" && (
        <CategoryLayoutSixV news={initial} locale={locale} />
      )}

      <AnimatePresence>
        {extraToShow.length > 0 && (
          <motion.div
            ref={containerRef}
            key="extra"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className={
                category !== "bezkupur"
                  ? "my-6 border-t border-neutral-200"
                  : ""
              }
            ></div>
            <CategoryLayoutFourH
              news={extraToShow}
              withText
              withPhoto
              locale={locale}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="bg-gray-100 px-6 py-2 rounded hover:bg-gray-100/80 text-gray-600 transition"
          >
            {locale === "ru" ? "Показать ещё" : "More news"}
          </button>
        </div>
      )}
    </div>
  );
}
