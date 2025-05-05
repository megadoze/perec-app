import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  try {
    const feed = await parser.parseURL("https://feeds.simplecast.com/54nAGcIl");

    const items = feed.items.map((item) => ({
      title: item.title,
      pubDate: item.pubDate,
      audioUrl: item.enclosure?.url,
      description: item.contentSnippet,
      image: item.itunes?.image,
    }));

    const paginated = items.slice(offset, offset + limit);

    return NextResponse.json(paginated);
  } catch (error) {
    console.error("Ошибка загрузки RSS:", error);
    return NextResponse.json(
      { error: "Failed to load podcast feed" },
      { status: 500 }
    );
  }
}
