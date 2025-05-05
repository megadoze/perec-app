"use client";

import { useEffect, useRef, useState } from "react";

export default function MiniPlayer({ title, audioUrl }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [audioUrl]);

  if (!audioUrl) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white px-4 py-2 z-50 flex items-center justify-between">
      <div className="truncate max-w-[70%] text-sm font-medium">{title}</div>
      <button
        onClick={() => {
          if (!audioRef.current) return;
          if (isPlaying) {
            audioRef.current.pause();
          } else {
            audioRef.current.play();
          }
          setIsPlaying(!isPlaying);
        }}
        className="ml-4 text-white"
      >
        {isPlaying ? "⏸" : "▶️"}
      </button>
      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
}
