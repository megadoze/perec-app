import { useEffect, useRef, useState } from "react";

export default function CategoryLayoutMediaFour({
  news,
  withPhoto,
  withText,
  lineClamp,
  locale,
  firstNewId,
  firstItemRef,
  theme,
}) {
  const emptyNews = {
    ru: "Нет новостей",
    en: "No news",
  };

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

  if (!news?.length) return <p>{emptyNews[locale]}</p>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-y-10">
      {news.map((item, idx) => {
        const imageUrl = item.images?.[0] || "";
        const isVideo =
          typeof imageUrl === "string" &&
          (imageUrl.includes(".mp4") || imageUrl.includes(".webm"));
        const title = item.translations?.[locale]?.title || "Без заголовка";
        const subTitle = item.translations?.[locale]?.subTitle || "";
        console.log(subTitle);

        return (
          <div
            key={item._id + idx}
            ref={item._id === firstNewId ? firstItemRef : null}
            className="
              px-0 md:px-4 pb-0
              md:[&:not(:nth-child(2n+1))]:border-l md:border-neutral-100 md:dark:border-gray-800
              lg:[&:not(:nth-child(4n+1))]:border-l lg:border-neutral-100 lg:dark:border-gray-800
              md:[&:nth-child(2n+1)]:pl-0
              md:[&:nth-child(2n)]:pr-0
              lg:[&:nth-child(4n+1)]:pl-0
              lg:[&:nth-child(3n)]:pl-4
              lg:[&:nth-child(3n+1)]:pl-4
              lg:[&:nth-child(3n+2)]:pl-4
              lg:[&:nth-child(2n)]:pr-4
              lg:[&:nth-child(4n+1)]:pr-4
              lg:[&:nth-child(4n)]:pr-0
            "
          >
            <article className="space-y-2 relative ">
              {withPhoto && imageUrl && (
                <>
                  {isVideo ? (
                    <VideoWithIcon url={imageUrl} />
                  ) : (
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full rounded-md"
                    />
                  )}
                </>
              )}

              <div className=" absolute bottom-4 left-4 right-4 z-0">
                <h2
                  className={`text-2xl font-narrow   ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {title}
                </h2>
              </div>
              {/* {withText && (
                <div className=" z-0">
                  <h2
                    className={`text-base font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {title}
                  </h2>
                </div>
              )} */}
            </article>
          </div>
        );
      })}
    </section>
  );
}
