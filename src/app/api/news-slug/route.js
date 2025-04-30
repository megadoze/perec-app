// app/api/news-slug/route.js
import { db, ref, get, child } from "@/lib/firebase";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const locale = searchParams.get("locale");

  if (!id || !locale) {
    return new Response(JSON.stringify({ error: "Missing params" }), {
      status: 400,
    });
  }

  const snapshot = await get(child(ref(db), `news/${id}`));
  const news = snapshot.val();

  if (!news || !news.translations?.[locale]) {
    return new Response(JSON.stringify({ error: "News not found" }), {
      status: 404,
    });
  }

  const slug = news.translations[locale].slug;
  const category = news.category;

  return new Response(JSON.stringify({ slug, category }), { status: 200 });
}
