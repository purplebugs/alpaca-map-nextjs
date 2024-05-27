import { db } from "@/functions/db.js";

export async function GET() {
  try {
    const result = await db.getFarms();

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "🧨 getFarms() could not fetch data" }, { status: 500 });
  }
}
