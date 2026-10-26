export const dynamic = "force-static";

export function GET() {
  const xml = `<?xml version="1.0"?>
<users>
\t<user>F89692437D14CC37D89D336DEC7DF860</user>
</users>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
