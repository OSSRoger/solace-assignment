import AdvocateTable from "@/components/AdvocateTable";
import { getAdvocatesWithSpecialties } from "@/db/model/advocate";

export default async function Home() {
  const advocates = await getAdvocatesWithSpecialties();

  return (
    <main className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Solace Advocates
        </h1>
        <AdvocateTable initialAdvocates={advocates} />
      </div>
    </main>
  );
}
