export async function GET() {
  return new Response("Sitemap stub OK", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

// export async function GET() {
//   const sitemapUrl =
//     "https://storage.googleapis.com/perec-news.firebasestorage.app/sitemap-index.xml";

//   try {
//     const response = await fetch(sitemapUrl);

//     if (!response.ok) {
//       return new Response(
//         `Fetch failed: ${response.status} ${response.statusText}`,
//         {
//           status: response.status,
//         }
//       );
//     }

//     const xml = await response.text();

//     return new Response(xml, {
//       headers: {
//         "Content-Type": "application/xml",
//         "Cache-Control": "no-cache",
//       },
//     });
//   } catch (error) {
//     return new Response("Error: " + error.message, {
//       status: 500,
//     });
//   }
// }
