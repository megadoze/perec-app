"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (window.history.length > 2) {
          router.back();
        } else {
          router.push("/");
        }
      }}
      className="inline-flex items-center gap-1 mt-6 text-cyan-700/60 hover:underline"
    >
      <span className="pb-1">←</span>
      <span>Назад к новостям</span>
    </button>
  );
}
