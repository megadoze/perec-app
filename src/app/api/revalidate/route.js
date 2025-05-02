export const runtime = "nodejs";
import { revalidateTag } from "next/cache";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  try {
    await revalidateTag("home"); // ⬅️ теперь будет сбрасывать кэш данных
    return new Response(`Revalidated tag: home`, {
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

// // export const dynamic = "force-dynamic";
// export const runtime = "nodejs";

// import { revalidatePath } from "next/cache";

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const secret = searchParams.get("secret");
//   const path = searchParams.get("path") || "/";

//   if (secret !== process.env.REVALIDATE_SECRET) {
//     return new Response("Invalid token", { status: 401 });
//   }

//   try {
//     await revalidatePath(path);
//     return new Response(`Revalidated: ${path}`, {
//       status: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "https://perec-news.web.app",
//         "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type",
//       },
//     });
//   } catch (err) {
//     return new Response("Error revalidating", { status: 500 });
//   }
// }
