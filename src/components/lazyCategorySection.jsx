// components/LazyCategorySection.js
"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function LazyCategorySection({
  importComponent,
  props,
  fallback = <p className="text-sm text-neutral-400">Loading...</p>,
}) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    if (inView && !Component) {
      importComponent().then((mod) => {
        setComponent(() => mod.default);
      });
    }
  }, [inView, Component, importComponent]);

  return <div ref={ref}>{Component ? <Component {...props} /> : fallback}</div>;
}
