"use client";

import dynamic from "next/dynamic";
const Component = dynamic(() => import("./categoryLayoutSix"), {
  ssr: false,
  loading: () => <p className="text-sm text-neutral-400">Загрузка...</p>,
});

export default function LazyCategorySix(props) {
  return <Component {...props} />;
}
