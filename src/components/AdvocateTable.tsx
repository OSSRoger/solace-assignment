"use client";

import { AdvocateWithSpecialties } from "@/db/model/advocate";
import { useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  initialAdvocates: AdvocateWithSpecialties[];
}

const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

export default function AdvocateTable({ initialAdvocates }: Props) {
  const [advocates, setAdvocates] =
    useState<AdvocateWithSpecialties[]>(initialAdvocates);
  const [isLoading, setIsLoading] = useState(false);
  const searchTermRef = useRef<HTMLSpanElement>(null);

  const debouncedSearch = useDebouncedCallback(async (searchTerm: string) => {
    setIsLoading(true);
    try {
      if (searchTermRef.current) {
        searchTermRef.current.textContent = searchTerm;
      }
      const response = await fetch(
        `/api/advocates?q=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      console.log(data);
      setAdvocates(data.data);
    } catch (error) {
      console.error("Error searching advocates:", error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Search Advocates</h2>
        <div className="flex gap-4 items-center">
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => debouncedSearch(e.target.value)}
            placeholder="Search by name, city, specialty..."
          />
          <button
            onClick={() => setAdvocates(initialAdvocates)}
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

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
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
              {advocates.map((advocate) => (
                <tr key={advocate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {advocate.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {advocate.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {advocate.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {advocate.degree}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {advocate.specialties.map((s) => (
                        <span
                          key={advocate.id + s.id }
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
                    {formatPhoneNumber(advocate.phoneNumber)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
