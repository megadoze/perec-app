"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const CategoryLayoutMediaFour = dynamic(() => import("./categoryLayoutMediaFour"), {
  ssr: false,
  loading: () => <p className="text-sm text-neutral-400">Загрузка...</p>,
});

export default function LazyCategoryMediaFour(props) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (inView) setShow(true);
  }, [inView]);

  return (
    <div ref={ref}>{show ? <CategoryLayoutMediaFour {...props} /> : null}</div>
  );
}