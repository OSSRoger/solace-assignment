import { AdvocatesTable, AdvocateSpecialtiesTable, SpecialtiesTable } from "@/db/schema";
import { advocateData, generateAdvocateSpecialtyRelations } from "@/db/seed/advocates";
import { specialtyData } from "@/db/seed/specialty";
import db from "@/db";

export async function POST() {
  const specialties = await db.insert(SpecialtiesTable).values(specialtyData).returning();
  const advocates = await db.insert(AdvocatesTable).values(advocateData).returning();
  
  const advocateIds = advocates.map(a => a.id);
  const relations = await generateAdvocateSpecialtyRelations(advocateIds);
  
  await db.insert(AdvocateSpecialtiesTable).values(relations);

  return Response.json({ advocates, specialties });
}
