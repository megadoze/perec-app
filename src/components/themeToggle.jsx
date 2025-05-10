"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    // ✅ Применяем тему
    document.documentElement.classList.toggle("dark", newTheme === "dark");

    // ✅ Сохраняем в localStorage
    localStorage.setItem("theme", newTheme);

    // ✅ Сохраняем в куку
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000; samesite=lax`;

    // ✅ Обновляем состояние React
    setTheme(newTheme);
  };

  if (theme === null) return null; // пока не знаем тему — ничего не рендерим

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-6 flex items-center rounded-full bg-gray-200 dark:bg-gray-700 p-1 transition-colors duration-300 relative"
      aria-label="Toggle theme"
    >
      <div
        className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          theme === "dark" ? "translate-x-6" : "translate-x-0"
        }`}
      />
      <div className="absolute text-xs pointer-events-none text-gray-800 dark:text-yellow-300 ml-[3px]">
        {theme === "dark" ? <Moon size={12} /> : <Sun size={12} />}
      </div>
    </button>
  );
}
