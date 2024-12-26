import { getAdvocatesWithSpecialties } from "@/db/model/advocate";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.toLowerCase() || "";

  const advocates = await getAdvocatesWithSpecialties(query);

  return Response.json({ data: advocates });
}
