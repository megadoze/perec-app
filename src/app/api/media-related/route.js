import { db, ref, get, child } from "@/lib/firebase";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const currentId = searchParams.get("id");
  const locale = searchParams.get("locale") || "ru";

  const snapshot = await get(child(ref(db), "news"));
  if (!snapshot.exists()) {
    return Response.json([]);
  }

  const all = snapshot.val();
  const related = Object.entries(all)
    .map(([id, item]) => ({ _id: id, ...item }))
    .filter(
      (item) =>
        item.status === "published" &&
        item.category === "media" &&
        item._id !== currentId &&
        item.translations?.[locale]?.title?.trim()
    )
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .slice(0, 4);

  return Response.json(related);
}
