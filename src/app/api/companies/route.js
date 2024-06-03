import db from "@/functions/db.js";

// Due to not passing in a parameter to the GET() method, 
// next thinks this can be a static page upon build. 
// Therefor forcing it do be dynamic.
export const dynamic = 'force-dynamic';

export async function GET() {  
  try {
    const result = await db.getFarms();

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "🧨 getFarms() could not fetch data" }, { status: 500 });
  }
}
