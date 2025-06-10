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

  return null;
}
