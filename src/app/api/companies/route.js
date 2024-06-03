import { getDatabase } from "@/functions/getData.js";

export async function GET() {
  const db = getDatabase();

  try {
    const result = await db.getFarms();

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "🧨 getFarms() could not fetch data" }, { status: 500 });
  }
}
