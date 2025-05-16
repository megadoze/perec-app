"use client";

import dynamic from "next/dynamic";
const Component = dynamic(() => import("./categoryLayoutMediaFour"), {
  ssr: false,
  loading: () => <p className="text-sm text-neutral-400">Загрузка...</p>,
});

export default function LazyCategoryMediaFour(props) {
  return <Component {...props} />;
}
