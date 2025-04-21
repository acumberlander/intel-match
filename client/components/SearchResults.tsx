"use client";
import React from "react";
import VehicleList from "./VehicleList";
import PeopleAndVehicleList from "./PeopleAndVehicleList";
import PeopleList from "./PeopleList";

interface SearchResultsProps {
  loading: boolean;
  error: string | undefined;
  results: any[];
  resultType: string | null;
  responseMessage: string | undefined;
}

const SearchResults = ({ loading, error, results, resultType, responseMessage }: SearchResultsProps) => {
  return (
    <div className="mt-6">
      {loading && <p className="mt-4 text-gray-500">Searching...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {responseMessage && (
        <p className="mt-6 text-lg font-medium text-gray-800">
          {responseMessage}
        </p>
      )}

      <div className="mt-6 space-y-6 overflow-auto max-h-[325px] mb-4">
        {resultType === "person" &&
          results.map((person) => (
            <PeopleList key={person._id} people={[person]} />
          ))}

        {resultType === "vehicle" &&
          results.map((vehicle) => (
            <VehicleList key={vehicle._id} vehicles={[vehicle]} />
          ))}

        {resultType === "both" &&
          results.map((person) => (
            <PeopleAndVehicleList
              key={person._id}
              people={[person]}
              showBoostInfo
            />
          ))}
      </div>
    </div>
  )
}

export default SearchResults