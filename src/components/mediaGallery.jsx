import Image from "next/image";

const MediaGallery = ({ media }) => {
  if (!media || media.length === 0) return null;

  return (
    <div className="">
      {media.map((item, index) => {
        if (item.type === "image") {
          return (
            <div key={index}>
              <Image
                src={item.url}
                alt={`image-${index}`}
                width={800}
                height={500}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          );
        }

        if (item.type === "video") {
          return (
            <div key={index}>
              <video
                src={item.url}
                poster={item.poster || ""}
                controls
                className="rounded-lg w-full h-auto"
              />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default MediaGallery;
