"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", "G-8PR1MTLCP6", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  // Кастомные события: вовлечённость
  useEffect(() => {
    // Событие: пользователь остался 30 секунд
    const timer = setTimeout(() => {
      window.gtag?.("event", "time_on_page_30s", {
        event_category: "engagement",
        event_label: pathname,
      });
    }, 30000);

    // События: глубина прокрутки
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent > 50) {
        window.gtag?.("event", "scroll_50_percent", {
          event_category: "engagement",
          event_label: pathname,
        });
        window.removeEventListener("scroll", onScroll);
      }

      if (scrollPercent > 90) {
        window.gtag?.("event", "scroll_90_percent", {
          event_category: "engagement",
          event_label: pathname,
        });
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
