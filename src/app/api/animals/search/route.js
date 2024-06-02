import { getAnimals } from "@/functions/getData.js";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const query = formData.get("query");
    const result = await getAnimals(query);

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "🧨 getAnimals() could not fetch data" }, { status: 500 });
  }
}
