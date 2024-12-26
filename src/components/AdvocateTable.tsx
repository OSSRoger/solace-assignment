"use client";

import { AdvocateWithSpecialties } from "@/db/model/advocate";
import { useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  initialAdvocates: AdvocateWithSpecialties[];
}

export default function AdvocateTable({ initialAdvocates }: Props) {
  const [advocates] = useState<AdvocateWithSpecialties[]>(initialAdvocates);
  const [filteredAdvocates, setFilteredAdvocates] =
    useState<AdvocateWithSpecialties[]>(initialAdvocates);
  const searchTermRef = useRef<HTMLSpanElement>(null);

  const debouncedFilter = useDebouncedCallback((searchTerm: string) => {
    console.log("filtering advocates...", { searchTerm });
    const filtered = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.specialties.some((specialty) =>
          specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        advocate.yearsOfExperience.toString().includes(searchTerm) ||
        advocate.phoneNumber.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filtered);
  }, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    if (searchTermRef.current) {
      searchTermRef.current.textContent = searchTerm;
    }

    debouncedFilter(searchTerm);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Search Advocates</h2>
        <div className="flex gap-4 items-center">
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onChange}
            placeholder="Search by name, city, specialty..."
          />
          <button
            onClick={() => setFilteredAdvocates(advocates)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Reset
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Searching for:{" "}
          <span ref={searchTermRef} className="font-medium"></span>
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Degree
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialties
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAdvocates.map((advocate) => (
              <tr key={advocate.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {advocate.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {advocate.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{advocate.city}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {advocate.degree}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {advocate.specialties.map((s) => (
                      <span
                        key={s.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {advocate.yearsOfExperience} years
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {advocate.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
