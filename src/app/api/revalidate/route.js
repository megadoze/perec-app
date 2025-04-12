import { revalidatePath } from "next/cache";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  try {
    // Перегенерируем главную страницу
    revalidatePath("/");

    return new Response("Revalidated", { status: 200 });
  } catch (err) {
    return new Response("Error revalidating", { status: 500 });
  }
}
