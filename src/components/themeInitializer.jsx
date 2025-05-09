"use client";

import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    const hour = new Date().getHours();

    const isNight = hour >= 20 || hour < 7; // тёмная тема с 20:00 до 07:00
    if (isNight) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return null;
}
