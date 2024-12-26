import { SelectAdvocate } from "../model/advocate";
import { getSpecialties, SelectSpecialty } from "../model/specialty";

export const advocateData = [
  {
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    degree: "MD",
    yearsOfExperience: 10,
    phoneNumber: "5551234567",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    city: "Los Angeles",
    degree: "PhD",
    yearsOfExperience: 8,
    phoneNumber: "5559876543",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    city: "Chicago",
    degree: "MSW",
    yearsOfExperience: 5,
    phoneNumber: "5554567890",
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    city: "Houston",
    degree: "MD",
    yearsOfExperience: 12,
    phoneNumber: "5556543210",
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    city: "Phoenix",
    degree: "PhD",
    yearsOfExperience: 7,
    phoneNumber: "5553210987",
  },
  {
    firstName: "Chris",
    lastName: "Martinez",
    city: "Philadelphia",
    degree: "MSW",
    yearsOfExperience: 9,
    phoneNumber: "5557890123",
  },
  {
    firstName: "Jessica",
    lastName: "Taylor",
    city: "San Antonio",
    degree: "MD",
    yearsOfExperience: 11,
    phoneNumber: "5554561234",
  },
  {
    firstName: "David",
    lastName: "Harris",
    city: "San Diego",
    degree: "PhD",
    yearsOfExperience: 6,
    phoneNumber: "5557896543",
  },
  {
    firstName: "Laura",
    lastName: "Clark",
    city: "Dallas",
    degree: "MSW",
    yearsOfExperience: 4,
    phoneNumber: "5550123456",
  },
  {
    firstName: "Daniel",
    lastName: "Lewis",
    city: "San Jose",
    degree: "MD",
    yearsOfExperience: 13,
    phoneNumber: "5553217654",
  },
  {
    firstName: "Sarah",
    lastName: "Lee",
    city: "Austin",
    degree: "PhD",
    yearsOfExperience: 10,
    phoneNumber: "5551238765",
  },
  {
    firstName: "James",
    lastName: "King",
    city: "Jacksonville",
    degree: "MSW",
    yearsOfExperience: 5,
    phoneNumber: "5556540987",
  },
  {
    firstName: "Megan",
    lastName: "Green",
    city: "San Francisco",
    degree: "MD",
    yearsOfExperience: 14,
    phoneNumber: "5559873456",
  },
  {
    firstName: "Joshua",
    lastName: "Walker",
    city: "Columbus",
    degree: "PhD",
    yearsOfExperience: 9,
    phoneNumber: "5556781234",
  },
  {
    firstName: "Amanda",
    lastName: "Hall",
    city: "Fort Worth",
    degree: "MSW",
    yearsOfExperience: 3,
    phoneNumber: "5559872345",
  },
];

// Helper function to get random specialties using actual DB IDs
const getRandomSpecialties = async (
  advocateId: SelectAdvocate["id"]
): Promise<
  { advocateId: SelectAdvocate["id"]; specialtyId: SelectSpecialty["id"] }[]
> => {
  const specialties = await getSpecialties();
  const specialtyIds = specialties.map((s) => s.id);

  // Generate 2-4 random unique specialties
  const numSpecialties = Math.floor(Math.random() * 3) + 2;
  const selectedSpecialties = new Set<string>();

  while (selectedSpecialties.size < numSpecialties) {
    const randomIndex = Math.floor(Math.random() * specialtyIds.length);
    selectedSpecialties.add(specialtyIds[randomIndex]);
  }

  return Array.from(selectedSpecialties).map((specialtyId) => ({
    advocateId,
    specialtyId,
  }));
};

export const generateAdvocateSpecialtyRelations = async (
  advocateIds: SelectAdvocate["id"][]
) => {
  const relations = await Promise.all(
    advocateIds.map((advocateId) => getRandomSpecialties(advocateId))
  );
  return relations.flat();
};
