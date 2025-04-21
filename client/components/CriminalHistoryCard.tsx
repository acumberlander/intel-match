"use client";
import React from "react";
import { Crime } from "../types/Crime";

interface CriminalHistoryCardProps {
  crime: Crime;
}

const CriminalHistoryCard = ({ crime }: CriminalHistoryCardProps) => {

  console.log("crime: ", crime);
  return (
    <div className="flex overflow-auto max-h-[325px] mb-4">
      <div
        key={crime._id}
        className="border border-gray-200 rounded-xl bg-white shadow-sm p-5 space-y-2 w-full"
      >
        <p className="text-lg font-semibold text-gray-800">
          Type: {crime.type}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Subject:</span>{" "}
          {crime.person}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Date:</span>{" "}
          {new Date(crime.date).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="text-sm text-gray-700 italic">
          <span className="not-italic font-medium text-gray-800">Notes:</span>{" "}
          {crime.notes}
        </p>
      </div>
    </div>
  );
};

export default CriminalHistoryCard;