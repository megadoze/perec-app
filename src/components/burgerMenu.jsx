"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy load Drawer, but NOT conditionally
const Drawer = dynamic(() => import("@mantine/core").then((m) => m.Drawer), {
  ssr: false,
  loading: () => null,
});

export default function BurgerMenu() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpened(true)}
        className="text-2xl md:text-xl py-1"
        aria-label="Открыть меню"
      >
        <span className="hidden md:inline-block">Menu</span> ☰
      </button>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        padding="xl"
        withCloseButton
        overlayProps={{ opacity: 0.5, blur: 4 }}
        transitionProps={{ transition: "slide-left", duration: 200 }}
        classNames={{
          header: "font-bold text-xl bg-[#faf8f5]",
          content: "bg-[#faf8f5] dark:bg-gray-900",
        }}
      >
        <nav className="flex flex-col gap-4 text-lg">
          <Link href="/" onClick={() => setOpened(false)}>
            Главная
          </Link>
          <Link href="/politics" onClick={() => setOpened(false)}>
            Политический перчик
          </Link>
          <Link href="/economics" onClick={() => setOpened(false)}>
            Экономика с огоньком
          </Link>
          <Link href="/life" onClick={() => setOpened(false)}>
            Жизнь острая как чили
          </Link>
          <Link href="/culture" onClick={() => setOpened(false)}>
            Поп-культура в перце
          </Link>
        </nav>
      </Drawer>
    </>
  );
}

// "use client";

// import { useState } from "react";
// import dynamic from "next/dynamic";
// // import { Drawer } from "@mantine/core";
// const Drawer = dynamic(() => import("@mantine/core").then((m) => m.Drawer), {
//   ssr: false,
// });
// import Link from "next/link";

// export default function BurgerMenu() {
//   const [opened, setOpened] = useState(false);

//   return (
//     <>
//       {/* Кнопка-бургер */}
//       <button
//         onClick={() => setOpened(true)}
//         className=" text-2xl md:text-xl py-1"
//         aria-label="Открыть меню"
//       >
//         <span className=" hidden md:inline-block">Menu</span> ☰
//       </button>

//       {/* Drawer от Mantine */}
//       <Drawer
//         opened={opened}
//         onClose={() => setOpened(false)}
//         position="right"
//         // title="Меню"
//         padding="xl"
//         withCloseButton
//         overlayProps={{ opacity: 0.5, blur: 4 }}
//         transitionProps={{ transition: "slide-left", duration: 200 }}
//         classNames={{
//           header: "font-bold text-xl bg-[#faf8f5]",
//           content: "bg-[#faf8f5] dark:bg-gray-900",
//         }}
//       >
//         <nav className="flex flex-col gap-4 text-lg">
//           <Link href="/" onClick={() => setOpened(false)}>
//             Главная
//           </Link>
//           <Link href="/politics" onClick={() => setOpened(false)}>
//             Политический перчик
//           </Link>
//           <Link href="/economics" onClick={() => setOpened(false)}>
//             Экономика с огоньком
//           </Link>
//           <Link href="/life" onClick={() => setOpened(false)}>
//             Жизнь острая как чили
//           </Link>
//           <Link href="/culture" onClick={() => setOpened(false)}>
//             Поп-культура в перце
//           </Link>
//         </nav>
//       </Drawer>
//     </>
//   );
// }
