"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";

export default function PodcastPlayer() {
  const locale = useLocale();
  const t = useTranslations("categoryDescription");

  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(0);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const LIMIT = 10;

  const description = {
    ru: "Один из самых популярных новостных подкастов мира. Выпуски — по будням, на английском",
    en: "One of the world’s most popular news podcasts. New episodes every weekday in English",
  };

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadMore() {
    setLoading(true);
    try {
      const offset = page * LIMIT;
      const res = await fetch(`/api/podcast?offset=${offset}&limit=${LIMIT}`);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setEpisodes((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1);
        setHasMore(data.length === LIMIT); // если меньше — конец
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Ошибка загрузки подкастов:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  const showMore = {
    ru: "Показать еще",
    en: "Show more",
  };

  const loadData = {
    ru: "Загрузка...",
    en: "Loading...",
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">{t("podcasts")}</h1>
      <p className="text-lg text-gray-800 dark:text-gray-300 p-0 m-0">
        {description[locale]}
      </p>

      <div>
        {episodes.map((ep, i) => {
          const isExpanded = expandedDescriptions[i];

          return (
            <div
              key={i}
              className="flex flex-col mt-6 bg-white dark:bg-gray-800/50 rounded shadow-md p-4 items-start gap-2"
            >
              <div className="flex gap-4">
                {ep.image && (
                  <img
                    src={ep.image}
                    alt={ep.title}
                    className="w-16 h-16 rounded-full flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-narrow font-bold mt-0">
                    {ep.title}
                  </h3>

                  <div className="relative">
                    <p
                      className={`text-lg font-light mt-2 text-gray-800 dark:text-gray-300 transition-all ${
                        isExpanded ? "" : "line-clamp-3 md:line-clamp-none"
                      }`}
                    >
                      {ep.description}
                    </p>

                    {!isExpanded && (
                      <button
                        onClick={() =>
                          setExpandedDescriptions((prev) => ({
                            ...prev,
                            [i]: true,
                          }))
                        }
                        className="mt-1 text-sm text-cyan-600 md:hidden"
                      >
                        {showMore[locale]}
                      </button>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(ep.pubDate).toLocaleDateString(locale, {
                      dateStyle: "medium",
                    })}
                  </p>
                </div>
              </div>

              <audio controls src={ep.audioUrl} className="w-full" />
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-gray-200 hover:bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded transition transform ease-in-out"
          >
            {loading ? loadData[locale] : showMore[locale]}
          </button>
        </div>
      )}
    </>
  );
}
