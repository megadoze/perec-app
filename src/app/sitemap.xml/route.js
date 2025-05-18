import { getMainSitemap } from "@/lib/getMainSitemap";

export async function GET() {
  const xml = await getMainSitemap();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=300",
    },
  });
}