import { getNewsSitemap } from "@/lib/getNewsSitemap"; // путь к твоей функции

export async function GET() {
  const xml = await getNewsSitemap();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=300", // кэшируем на 5 минут
    },
  });
}
