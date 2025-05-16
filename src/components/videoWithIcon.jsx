"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function VideoWithIcon({ imageUrl, posterUrl, news, locale }) {
  const videoRef = useRef(null);
  const previewRef = useRef(null);
  const titleRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const showPreview = () => {
      if (previewRef.current) previewRef.current.style.display = "flex";
      if (titleRef.current) titleRef.current.style.display = "flex";
    };

    const hidePreview = () => {
      if (previewRef.current) previewRef.current.style.display = "none";
      if (titleRef.current) titleRef.current.style.display = "none";
    };

    const handlePlay = () => {
      hidePreview();
      if (!isMobile) video.setAttribute("controls", "controls");
    };

    const handlePause = () => {
      if (!video.ended) showPreview();
      if (!isMobile) video.removeAttribute("controls");
    };

    const handleEnded = () => {
      showPreview();
      if (!isMobile) video.removeAttribute("controls");
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
        src={imageUrl}
        poster={posterUrl}
        muted
        playsInline
        controls={isMobile}
        className="w-full cursor-pointer aspect-[9/16] md:h-[500px] object-cover"
      />

      {!isMobile && (
        <div
          ref={previewRef}
          onClick={handleOverlayClick}
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-transparent"
          style={{ display: "flex" }}
        >
          <div className="flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full w-20 h-20 text-xl sm:text-2xl shadow-lg">
            <span>▶</span>
          </div>
        </div>
      )}

      <div
        ref={!isMobile ? titleRef : null}
        className="absolute bottom-4 left-4 right-4 bg-gray-900/40 px-4 py-2 rounded-sm"
        style={!isMobile ? { display: "flex" } : undefined}
      >
        <Link href={`/${locale}/media/${news.translations[locale].slug}`}>
          <h2 className="text-2xl font-narrow tracking-wide text-white">
            {news.translations[locale].title}
          </h2>
        </Link>
      </div>
    </div>
  );
}
