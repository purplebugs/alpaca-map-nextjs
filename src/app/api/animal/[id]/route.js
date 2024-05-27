import { db } from "@/functions/db.js";

export async function GET(req, context) {
  // api/company/:id

  const { id } = await context?.params;

  try {
    const idAsNumber = +id; // parseInt(id) does not work as it converts eg "16dsfds" -> "16"
    if (!Number.isInteger(idAsNumber)) {
      return Response.json({ message: "🙄 Id is not a number" }, { status: 400 });
    }

    const result = await db.getAnimal(id);

    if (!result || result.length === 0) {
      return Response.json({ message: "😅 Not found" }, { status: 404 });
    }

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "🧨 animalFetcher() could not fetch data" }, { status: 500 });
  }
}
