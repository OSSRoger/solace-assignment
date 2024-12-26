import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import db from "..";
import {
  AdvocateSpecialtiesTable,
  AdvocatesTable,
  SpecialtiesTable,
} from "../schema";
import { SelectSpecialty } from "./specialty";

export type SelectAdvocate = typeof AdvocatesTable.$inferSelect;
export type InsertAdvocate = typeof AdvocatesTable.$inferInsert;

// Extended type with specialties
export type AdvocateWithSpecialties = SelectAdvocate & {
  specialties: SelectSpecialty[];
};

export const InsertAdvocateValidator = createInsertSchema(AdvocatesTable, {
  firstName: z
    .string()
    .max(100, { message: "First Name cannot exceed 100 characters" }),
  lastName: z
    .string()
    .max(100, { message: "Last Name cannot exceed 100 characters" }),
  city: z.string().max(100, { message: "City cannot exceed 100 characters" }),
  degree: z
    .string()
    .max(100, { message: "Degree cannot exceed 100 characters" }),
  yearsOfExperience: z
    .number()
    .min(0, { message: "Years of Experience must be greater than 0" }),
  phoneNumber: z
    .string()
    .max(10, { message: "Phone Number cannot exceed 10 characters" }),
});

export async function getAdvocates(): Promise<SelectAdvocate[]> {
   return await db.select().from(AdvocatesTable);
}

export async function getAdvocatesWithSpecialties(): Promise<AdvocateWithSpecialties[]> {
  const advocates = await db
    .select({
      id: AdvocatesTable.id,
      firstName: AdvocatesTable.firstName,
      lastName: AdvocatesTable.lastName,
      city: AdvocatesTable.city,
      degree: AdvocatesTable.degree,
      yearsOfExperience: AdvocatesTable.yearsOfExperience,
      phoneNumber: AdvocatesTable.phoneNumber,
      createdAt: AdvocatesTable.createdAt,
    })
    .from(AdvocatesTable);

  const advocateSpecialties = await db
    .select({
      advocateId: AdvocateSpecialtiesTable.advocateId,
      specialty: SpecialtiesTable,
    })
    .from(AdvocateSpecialtiesTable)
    .innerJoin(
      SpecialtiesTable,
      eq(AdvocateSpecialtiesTable.specialtyId, SpecialtiesTable.id)
    );

  return advocates.map(advocate => ({
    ...advocate,
    specialties: advocateSpecialties
      .filter(as => as.advocateId === advocate.id)
      .map(as => as.specialty)
  }));
}

export async function insertAdvocate(data: InsertAdvocate) {
  const validatedData = InsertAdvocateValidator.parse(data);
  if (data.id) {
    const existingAdvocate = await getAdvocateById(data.id);
    if (existingAdvocate) {
      console.log(`Advocate with ID (${data.id}) already exists`);
      return existingAdvocate;
    }
  }

  const response = await db
    .insert(AdvocatesTable)
    .values(validatedData)
    .returning();
  return response[0];
}

export async function getAdvocateById(id: SelectAdvocate["id"]) {
  const response = await db
    .select()
    .from(AdvocatesTable)
    .where(eq(AdvocatesTable.id, id));
  return response[0];
}

export async function updateAdvocate(
  id: SelectAdvocate["id"],
  data: Partial<Omit<InsertAdvocate, "id">>
) {
  const validatedData = InsertAdvocateValidator.parse(data);

  const response = await db
    .update(AdvocatesTable)
    .set(validatedData)
    .where(eq(AdvocatesTable.id, id))
    .returning();
  return response[0];
}

export async function deleteAdvocate(id: SelectAdvocate["id"]) {
  await db.delete(AdvocatesTable).where(eq(AdvocatesTable.id, id));
}
