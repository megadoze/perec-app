"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function VideoWithIcon({ url }) {
  const videoRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const showPreview = () => {
      previewRef.current.style.display = "flex";
    };

    const hidePreview = () => {
      previewRef.current.style.display = "none";
    };

    const handlePlay = () => {
      hidePreview();
      video.setAttribute("controls", "controls");
    };

    const handlePause = () => {
      if (!video.ended) showPreview();
    };

    const handleEnded = () => {
      showPreview();
      video.removeAttribute("controls");
      video.currentTime = 0;
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleOverlayClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play().catch((err) => console.warn("play() error:", err));
    } else {
      video.pause();
    }
  };

  return (
    <div className="relative w-full">
      <video
        ref={videoRef}
        src={url}
        muted
        playsInline
        className="w-full rounded-md cursor-pointer"
      />
      <div
        ref={previewRef}
        onClick={handleOverlayClick}
        className="absolute inset-0 flex items-center justify-center cursor-pointer bg-transparent"
        style={{ display: "flex" }}
      >
        <div className="bg-black bg-opacity-50 text-white rounded-full p-4 text-xl sm:text-2xl shadow-lg">
          ▶
        </div>
      </div>
    </div>
  );
}

export default function MediaLayout({ data, locale }) {
  const t = data.translations?.[locale] ?? {};
  const [relatedMedia, setRelatedMedia] = useState([]);

  const isVideo =
    typeof data.images?.[0] === "string" &&
    (data.images[0].includes(".mp4") || data.images[0].includes(".webm"));

  useEffect(() => {
    fetch("/api/media-related?id=" + data._id + "&locale=" + locale)
      .then((res) => res.json())
      .then((items) => setRelatedMedia(items))
      .catch((err) => console.warn("Ошибка загрузки похожих:", err));
  }, [data._id, locale]);

  return (
    <div className="max-w-3xl mx-auto px-0 py-10">
      <h1 className="text-3xl font-bold mb-4">{t.title || "Без заголовка"}</h1>

      <div className="mb-6 text-gray-500 text-sm">
        {new Date(data.publishedAt).toLocaleDateString(locale)}
      </div>

      <div className="mb-6 flex justify-center">
        <div className="relative w-full mx-auto max-w-full sm:max-w-[360px]">
          {isVideo ? (
            <VideoWithIcon url={data.images[0]} />
          ) : (
            <img
              src={data.images?.[0]}
              alt={t.title}
              className="rounded-lg w-full"
            />
          )}
        </div>
      </div>

      {(t.subTitle || t.telegramText) && (
        <p
          className="text-lg text-gray-200 mb-4"
          dangerouslySetInnerHTML={{
            __html: t.telegramText,
          }}
        />
      )}

      {Array.isArray(t.tags) && t.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {t.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-zinc-100 dark:bg-gray-800 text-zinc-600 dark:text-zinc-300 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {relatedMedia.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">
            {locale === "ru" ? "Похожие материалы" : "Related media"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedMedia.map((item) => {
              const tt = item.translations?.[locale] ?? {};
              const slug = tt.slug;
              const url = `/${locale}/media/${slug}`;
              const imageUrl = item.images?.[0];

              const isVideo =
                typeof imageUrl === "string" &&
                (imageUrl.includes(".mp4") || imageUrl.includes(".webm"));

              return (
                <Link key={item._id} href={url} className="group">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    {isVideo ? (
                      <div className="bg-black/60 absolute inset-0 flex items-center justify-center z-10">
                        <span className="text-white text-2xl">▶</span>
                      </div>
                    ) : null}
                    <img
                      src={imageUrl}
                      alt={tt.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2">
                    {tt.title}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
