import db from "..";
import { eq } from "drizzle-orm";
import { SpecialtiesTable } from "../schema";

export type SelectSpecialty = typeof SpecialtiesTable.$inferSelect;
export type InsertSpecialty = typeof SpecialtiesTable.$inferInsert;

export async function getSpecialties(): Promise<SelectSpecialty[]> {
  return await db.select().from(SpecialtiesTable);
}

export async function getSpecialtyById(id: SelectSpecialty["id"]) {
  const response = await db
    .select()
    .from(SpecialtiesTable)
    .where(eq(SpecialtiesTable.id, id));
  return response[0];
}

export async function insertSpecialty(data: InsertSpecialty) {
  const response = await db
    .insert(SpecialtiesTable)
    .values(data)
    .returning();
  return response[0];
}

export async function updateSpecialty(
  id: SelectSpecialty["id"],
  data: Partial<Omit<InsertSpecialty, "id">>
) {
  const response = await db
    .update(SpecialtiesTable)
    .set(data)
    .where(eq(SpecialtiesTable.id, id))
    .returning();
  return response[0];
}

export async function deleteSpecialty(id: SelectSpecialty["id"]) {
  await db.delete(SpecialtiesTable).where(eq(SpecialtiesTable.id, id));
} 