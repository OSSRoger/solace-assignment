"use client";

import { AdvocateWithSpecialties } from "@/db/model/advocate";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<AdvocateWithSpecialties[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<AdvocateWithSpecialties[]>([]);
  const searchTermRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates")
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (Array.isArray(jsonResponse.data)) {
          setAdvocates(jsonResponse.data);
          setFilteredAdvocates(jsonResponse.data);
        } else {
          console.error('Expected array of advocates:', jsonResponse.data);
          setAdvocates([]);
          setFilteredAdvocates([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching advocates:', error);
        setAdvocates([]);
        setFilteredAdvocates([]);
      });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    if (searchTermRef.current) {
      searchTermRef.current.textContent = searchTerm;
    }

    console.log("filtering advocates...");
    const filtered = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.some(specialty => 
          specialty.name.includes(searchTerm)
        ) ||
        advocate.yearsOfExperience.toString().includes(searchTerm) ||
        advocate.phoneNumber.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filtered);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span ref={searchTermRef}></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredAdvocates) && filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div key={s.id}>{s.name}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
