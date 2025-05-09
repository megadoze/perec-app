import { getNewsSitemap } from "@/lib/getNewsSitemap";

export async function GET() {
  const xml = await getNewsSitemap();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
