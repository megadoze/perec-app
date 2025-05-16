"use client";

import dynamic from "next/dynamic";
const Component = dynamic(() => import("./categoryLayoutSixV"), {
  ssr: false,
  loading: () => <p className="text-sm text-neutral-400">Загрузка...</p>,
});

export default function LazyCategorySixV(props) {
  return <Component {...props} />;
}
