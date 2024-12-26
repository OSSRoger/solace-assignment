import { getAdvocatesWithSpecialties } from "@/db/model/advocate";

export async function GET() {
  const data = await getAdvocatesWithSpecialties();

  return Response.json({ data });
}
