"use client";

import { motion, AnimatePresence } from "framer-motion";
import BackButton from "./backButton";
import dayjs from "dayjs";

export default function NewsContent({ data }) {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: data.title,
              description: data.subTitle || "",
              image: Array.isArray(data.images) ? data.images[0] : "",
              datePublished: new Date(data.publishedAt).toISOString(),
              author: {
                "@type": "Organization",
                name: "PEREC.news",
              },
            }),
          }}
        />
      </Head>
      <AnimatePresence mode="sync">
        <motion.div
          key="data"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <article className="max-w-3xl mx-auto p-0">
            <h1 className="text-3xl font-narrow font-bold mb-2">
              {data.title}
            </h1>
            <p className="text-gray-500 text-sm mb-4">
              Опубликовано:{" "}
              {dayjs(data.publishedAt).format("DD MMM YYYY HH:mm")}
            </p>
            <h2 className="text-xl font-narrow">{data?.subTitle}</h2>
            <div
              className="pt-4 text-lg font-light leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.content }}
            ></div>
            <p className="mt-6 text-sm text-gray-400">Автор: {data.author}</p>
            <BackButton />
          </article>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
