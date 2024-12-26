import { relations, sql } from "drizzle-orm";
import { 
  integer, 
  pgTable, 
  serial, 
  text, 
  timestamp,
  uuid 
} from "drizzle-orm/pg-core";

// Specialties Table
export const SpecialtiesTable = pgTable("specialties", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Many-to-many relationship
export const AdvocateSpecialtiesTable = pgTable("advocate_specialties", {
  advocateId: uuid("advocate_id")
    .references(() => AdvocatesTable.id)
    .notNull(),
  specialtyId: uuid("specialty_id")
    .references(() => SpecialtiesTable.id)
    .notNull(),
  id: serial("id").primaryKey(),
});

// Advocates Table 
export const AdvocatesTable = pgTable("advocates", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Define relations
export const advocatesRelations = relations(AdvocatesTable, ({ many }) => ({
  specialties: many(AdvocateSpecialtiesTable),
}));

export const advocateSpecialtiesRelations = relations(
  AdvocateSpecialtiesTable,
  ({ one }) => ({
    advocate: one(AdvocatesTable, {
      fields: [AdvocateSpecialtiesTable.advocateId],
      references: [AdvocatesTable.id],
    }),
    specialty: one(SpecialtiesTable, {
      fields: [AdvocateSpecialtiesTable.specialtyId],
      references: [SpecialtiesTable.id],
    }),
  })
);

export const specialtiesRelations = relations(SpecialtiesTable, ({ many }) => ({
  advocates: many(AdvocateSpecialtiesTable),
}));
