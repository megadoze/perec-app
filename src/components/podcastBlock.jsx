"use client";

import { useLocale } from "next-intl";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function PodcastBlock() {
  const locale = useLocale();

  const [episode, setEpisode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/podcast")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEpisode(data[0]);
        } else {
          setError("Не удалось загрузить подкаст");
        }
      })
      .catch(() => setError("Ошибка при загрузке подкаста"));
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-neutral-100 text-sm text-gray-600 rounded">
        {error}
      </div>
    );
  }

  if (!episode) return null;

  const podcastName = {
    ru: "Подкасты",
    en: "Podcasts",
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className=" flex items-start gap-4">
          {/* Миниатюра слева */}
          {episode.image && (
            <img
              src={episode.image}
              alt={episode.title}
              className="w-16 h-16 rounded-full flex-shrink-0"
            />
          )}
          {/* Текст и дата */}
          <div className="flex-1">
            <Link
              href={`${locale}/podcasts`}
              className=" font-narrow text-red-600 "
            >
              {podcastName[locale]}
            </Link>
            <h3 className="text-base font-semibold p-0 m-0">{episode.title}</h3>
            {/* <p className="text-sm text-gray-500 mt-1">
              {new Date(episode.pubDate).toLocaleDateString("ru-RU", {
                dateStyle: "medium",
              })}
            </p> */}
          </div>
        </div>

        {/* Аудио */}
        <audio controls src={episode.audioUrl} className="w-full" />
      </div>
    </>
  );
}
