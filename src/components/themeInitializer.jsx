"use client";

import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    // 1. Читаем тему из куки, если есть
    const cookieThemeMatch = document.cookie.match(/theme=(dark|light)/);
    const savedTheme = cookieThemeMatch?.[1];

    if (savedTheme) {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
      return;
    }

    // 2. Если куки нет — fallback на время суток
    const hour = new Date().getHours();
    const isNight = hour >= 20 || hour < 7;

    document.documentElement.classList.toggle("dark", isNight);
  }, []);

  return null;
}
