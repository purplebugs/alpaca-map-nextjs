import db from "@/functions/db.js";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const query = formData.get("query");

    const url = new URL(request?.url);
    const searchParams = new URLSearchParams(url?.searchParams);
    const from = searchParams.get("from");
    const size = searchParams.get("size");

    const result = await db.getCompanies(query, from, size);

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "🧨 getCompanies() could not fetch data" }, { status: 500 });
  }
}
