import { db } from "@/functions/db.js";

export async function GET(req, context) {
  // TODO Ref: https://nextjs.org/docs/app/building-your-application/routing/route-handlers#url-query-parameters
  const searchParams = new URLSearchParams(req.url);
  let { lat, lng, radius } = await context?.params;

  lat = parseFloat(lat);
  lng = parseFloat(lng);
  radius = parseInt(radius, 10); // An integer in meters, as per Elastic default

  const publicFlag = searchParams.get("public");
  const privateFlag = searchParams.get("private");

  // eg. /api/companies/:lat/:lng/:radius?public=true&private=false
  const publicFarms = publicFlag === "false" ? false : true;
  const privateFarms = privateFlag === "false" ? false : true;

  if (Number.isNaN(lat)) {
    return Response.json({ message: "🙄 Lat is not a floating point number" }, { status: 400 });
  }

  if (Number.isNaN(lng)) {
    return Response.json({ message: "🙄 Lng is not a floating point number" }, { status: 400 });
  }

  if (!Number.isInteger(radius)) {
    return Response.json({ message: "🙄 Radius is not a number" }, { status: 400 });
  }

  try {
    const result = await db.getGeoDistanceRadius(lat, lng, radius, publicFarms, privateFarms);

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "🧨 getGeoDistanceRadius() could not fetch data" }, { status: 500 });
  }
}
