"use client";
import React from "react";
import { Person } from "../types/Person";
import { useCriminalHistory } from "../context/CriminalHistoryContext";

interface PeopleListProps {
  people: Person[];
  showBoostInfo?: boolean;
}

const PeopleAndVehicleList = ({ people, showBoostInfo = false }: PeopleListProps) => {
  const { handleCriminalHistoryClick } = useCriminalHistory();
  
  if (!people?.length) return null;

  return (
    <div className="space-y-6">
      {people.map((person) => (
        <div
          onClick={() =>
            person.crimeHistory && handleCriminalHistoryClick(person)
          }
          key={person._id}
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
          {showBoostInfo && (
            <p className="text-sm text-blue-600 mt-1">
              Final Score: {(person.finalScore! * 100).toFixed(1)}%
            </p>
          )}
          {person.matchedVehicles && person.matchedVehicles?.length > 0 && (
            <div className="mt-2 border-t pt-2">
              <p className="text-sm font-semibold mb-1">Matched Vehicles:</p>
              {person.matchedVehicles.map((v) => (
                <div key={v._id} className="text-sm pl-2 mb-1">
                  • {v.make} {v.model} ({v.color}) – Similarity:{" "}
                  {(v.similarity * 100).toFixed(1)}%{" "}
                  {v.isStolen && <span className="text-red-500">(Stolen)</span>}
                </div>
              ))}
            </div>
          )}
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

export default PeopleAndVehicleList;
