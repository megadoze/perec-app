// app/api/image/route.ts
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("path");
  
    if (!imageUrl) {
      return new Response("Missing path", { status: 400 });
    }
  
    const res = await fetch(imageUrl);
    const buffer = await res.arrayBuffer();
  
    return new Response(buffer, {
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "image/webp",
        "Content-Length": buffer.byteLength.toString(),
        "Cache-Control": "public, max-age=31536000",
      },
    });
  }
  