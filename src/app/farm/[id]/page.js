import { db } from "@/functions/db.js";

export default async function Page({ params }) {
  const result = await db.getCompany(params.id);

  console.log("result[0].city", result[0].city);

  return (
    <div>
      My Farm Page: {params.id} - City: {result[0].city}
    </div>
  );
}
