"use client";

import { useEffect, useRef, useState } from "react";
import PublishedAt from "./publishedAt";

function VideoWithIcon({ url, posterUrl }) {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Определяем, мобилка ли
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      if (!isMobile) setShowControls(true);
    };

    const handlePause = () => {
      if (!video.ended) setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowControls(false);
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
  }, [isMobile]);

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
        poster={posterUrl}
        muted
        playsInline
        controls={isMobile || showControls}
        className="w-full cursor-pointer aspect-[9/16] md:max-h-[600px] object-cover"
      />
      {/* Кастомная кнопка ▶ только на десктопе и когда видео не играет */}
      {!isMobile && !isPlaying && (
        <div
          onClick={handleOverlayClick}
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-transparent z-10"
        >
          <div className="flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full w-20 h-20 text-xl sm:text-2xl shadow-lg">
            <span>▶</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MediaLayout({ data, locale }) {
  const t = data.translations?.[locale] ?? {};

  const isVideo = data?.images[0].type === "video";
  const imageUrl = data?.images[0].url || "";
  const posterUrl = data?.images[0].poster || "";

  const published = {
    ru: "Опубликовано",
    en: "Published",
  };

  return (
    <article className="max-w-3xl h-fit mx-auto">
      <h1 className="text-4xl md:text-5xl font-narrow font-bold mb-2">
        {t.title || "Без заголовка"}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 font-light text-base">
        {published[locale]}:{" "}
        <PublishedAt timestamp={data.publishedAt} locale={locale} />
      </p>

      <div className=" flex flex-col md:flex-row gap-6 mt-8 mb-6">
        <div className="order-2 md:order-1 flex-1">
          {t.subTitle && (
            <p
              className="text-2xl font-narrow  text-gray-800 dark:text-gray-200 mb-4 mt-0 md:-mt-2 "
              dangerouslySetInnerHTML={{
                __html: t.subTitle,
              }}
            />
          )}
          {t.telegramText && (
            <p
              className="text-xl font-light leading-relaxed text-gray-800 dark:text-gray-200 mb-4 mt-0"
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
                  className="text-sm bg-zinc-100 dark:bg-gray-800 text-zinc-600 dark:text-zinc-300 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="order-1 md:order-2 relative w-full mx-auto md:max-w-[400px]">
          {isVideo ? (
            <VideoWithIcon url={imageUrl} posterUrl={posterUrl} />
          ) : (
            <img
              src={data.images?.[0].url}
              alt={t.title}
              className="w-full aspect-[9/16] md:max-h-[600px] object-cover"
            />
          )}
        </div>
      </div>
    </article>
  );
}
