import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CategoryLayoutMediaFour({
  news,
  withPhoto,
  locale,
  firstNewId,
  firstItemRef,
  theme,
}) {
  const emptyNews = {
    ru: "Нет новостей",
    en: "No news",
  };

  function VideoWithIcon({ imageUrl, news, posterUrl }) {
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
        // ✅ На десктопе добавляем controls вручную
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
          controls={isMobile} // ✅ на мобилке controls по умолчанию, без кастома
          className="w-full cursor-pointer h-[500px] object-cover"
        />

        {/* ✅ Кастомный контрол — только если НЕ мобилка */}
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

        {/* ✅ Заголовок — только если НЕ мобилка */}
        {/* {!isMobile && ( */}
        <div
          ref={titleRef}
          className="absolute bottom-4 left-4 right-4 bg-gray-900/40 px-4 py-2 rounded-sm"
          style={{ display: "flex" }}
        >
          <Link href={`/${locale}/media/${news.translations[locale].slug}`}>
            <h2 className="text-xl font-narrow tracking-wide text-white">
              {news.translations[locale].title}
            </h2>
          </Link>
        </div>
        {/* )} */}
      </div>
    );
  }

  if (!news?.length) return <p>{emptyNews[locale]}</p>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {news.map((item, idx) => {
        const imageUrl = item.images[0].url || "";
        const isVideo = item.images[0].type === "video";
        const posterUrl = item.images[0].poster;

        const title = item.translations?.[locale]?.title || "Без заголовка";

        return (
          <div
            key={item._id + idx}
            ref={item._id === firstNewId ? firstItemRef : null}
            className=""
          >
            <article className="relative">
              {withPhoto && imageUrl && (
                <>
                  {isVideo ? (
                    <VideoWithIcon
                      imageUrl={imageUrl}
                      news={item}
                      posterUrl={posterUrl}
                    />
                  ) : (
                    <img src={imageUrl} alt={title} className="w-full h-[500px] object-cover" />
                  )}
                </>
              )}
            </article>
          </div>
        );
      })}
    </section>
  );
}
