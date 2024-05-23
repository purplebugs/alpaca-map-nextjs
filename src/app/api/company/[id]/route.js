import { client } from "@/functions/utils.js";
import CompanyFetcher from "@/app/functions/companyFetcher.js";

export async function GET(req, context) {
  // api/company/:id

  const { id } = await context?.params;

  try {
    const idAsNumber = +id; // parseInt(id) does not work as it converts eg "16dsfds" -> "16"
    if (!Number.isInteger(idAsNumber)) {
      return Response.json({ message: "🙄 Id is not a number" }, { status: 400 });
    }

    const fetcher = new CompanyFetcher(client, id);
    const result = await fetcher.fetch();

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "🧨 companyFetcher() could not fetch data" }, { status: 500 });
  }
}
