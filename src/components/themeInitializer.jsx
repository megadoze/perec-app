"use client";

import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    const cookieThemeMatch = document.cookie.match(/theme=(dark|light)/);
    const savedTheme = cookieThemeMatch?.[1];

    if (savedTheme) {
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return;
    }

    // fallback по времени
    const hour = new Date().getHours();
    const isNight = hour >= 20 || hour < 7;

    if (isNight) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return null;
}
