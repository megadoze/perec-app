"use client";

import { useState } from "react";
import { Drawer } from "@mantine/core";
import Link from "next/link";

export default function BurgerMenu() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {/* Кнопка-бургер */}
      <button
        onClick={() => setOpened(true)}
        className=" text-2xl px-2 py-1"
        aria-label="Открыть меню"
      >
        ☰
      </button>

      {/* Drawer от Mantine */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        title="Меню"
        padding="md"
        size="xs"
        withCloseButton
        overlayProps={{ opacity: 0.5, blur: 4 }}
        transitionProps={{ transition: "slide-left", duration: 200 }}
        classNames={{
          header: "font-bold text-xl",
          content: "bg-white dark:bg-gray-900",
        }}
      >
        <nav className="flex flex-col gap-4 text-lg">
          <Link href="/" onClick={() => setOpened(false)}>
            Главная
          </Link>
          <Link href="/news" onClick={() => setOpened(false)}>
            Новости
          </Link>
          <Link href="/about" onClick={() => setOpened(false)}>
            О проекте
          </Link>
          <Link href="/login" onClick={() => setOpened(false)}>
            Вход
          </Link>
        </nav>
      </Drawer>
    </>
  );
}
