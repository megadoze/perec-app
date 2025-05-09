"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const effectiveTheme = storedTheme || (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle(
      "dark",
      effectiveTheme === "dark"
    );
    setTheme(effectiveTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-6 flex items-center rounded-full bg-gray-200 dark:bg-gray-700 p-1 transition-colors duration-300"
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
