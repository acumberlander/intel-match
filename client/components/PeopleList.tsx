"use client";
import React from "react";
import { Person } from "../types/Person";
import { Crime } from "../types/Crime";
import { useCriminalHistory } from "../context/CriminalHistoryContext";

interface PeopleListProps {
  people: Person[];
}

const PeopleList = ({ people }: PeopleListProps) => {
  const { handleCriminalHistoryClick } = useCriminalHistory();
  
  

  if (!people?.length) return null;

  return (
    <div className="space-y-6">
      {people.map((person) => (
        <div
          key={person._id}
          onClick={() =>
            person.crimeHistory &&
            handleCriminalHistoryClick(person)
          }
          className="border p-4 rounded bg-white shadow hover:shadow-md cursor-pointer"
        >
          <p className="font-semibold text-xl">{person.name}</p>
          {person.age && (
            <p className="text-sm text-gray-600">Age: {person.age}</p>
          )}
          <p className="text-gray-700 italic mt-1">{person.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            Similarity: {(person.similarity * 100).toFixed(1)}%
          </p>
          {person.crimeHistory && person.crimeHistory.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-red-600 font-semibold">
                Has criminal history (click to view)
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PeopleList;
