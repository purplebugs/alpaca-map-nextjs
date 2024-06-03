import { getDatabase } from "@/functions/getData.js";

export async function POST(request) {
  const db = getDatabase();

  try {
    const formData = await request.formData();
    const query = formData.get("query");
    const result = await db.getCompanies(query);

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "🧨 getCompanies() could not fetch data" }, { status: 500 });
  }
}
