import { revalidatePath } from "next/cache";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  try {
    // Перегенерируем главную страницу
    await revalidatePath("/");

    return new Response("Revalidate", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://perec-news.web.app",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    return new Response("Error revalidating", { status: 500 });
  }
}
