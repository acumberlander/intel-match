"use client";
import React, { createContext, useContext, useState } from "react";
import { Crime } from "../types/Crime";
import CriminalHistoryModal from "../components/CriminalHistoryModal";
import useCrimeData from "../hooks/useCrimeData";
import { Person } from "@/types/Person";

interface CriminalHistoryContextType {
  showCriminalHistory: (crimes: Crime[] | string[]) => void;
  hideCriminalHistory: () => void;
  fetchAndShowCrimeById: (id: string) => Promise<Crime | null>;
  handleCriminalHistoryClick: (person: Person) => void;
}

const CriminalHistoryContext = createContext<CriminalHistoryContextType | null>(null);

export const useCriminalHistory = () => {
  const context = useContext(CriminalHistoryContext);
  if (!context) {
    throw new Error("useCriminalHistory must be used within a CriminalHistoryProvider");
  }
  return context;
};

export const CriminalHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [crimes, setCrimes] = useState<Crime[] | string[]>([]);
  const { fetchCrimeById, loading, error } = useCrimeData();

  const showCriminalHistory = (crimes: Crime[] | string[]) => {
    setCrimes(crimes);
    setIsOpen(true);
  };

  const hideCriminalHistory = () => {
    setIsOpen(false);
  };

  const fetchAndShowCrimeById = async (id: string) => {
    const crime = await fetchCrimeById(id);
    if (crime) {
      showCriminalHistory([crime]);
      return crime;
    }
    return null;
  };

  const handleCriminalHistoryClick = (person: Person) => {
    let crimeArray: Crime[] | null = [];
    if (person.crimeHistory && person.crimeHistory.length > 0) {
      // Fetch each crime by ID
      const crimeIdArray = person.crimeHistory.map((crimeId) =>
        crimeId.toString()
      );
      crimeIdArray.forEach(async (crimeId) => {
        const crime = await fetchAndShowCrimeById(crimeId);
        if (crime) {
          crimeArray.push(crime);
        }
      });
      if (crimeArray) {
        showCriminalHistory(crimeArray);
      }
    }
  };

  return (
    <CriminalHistoryContext.Provider
      value={{
        showCriminalHistory,
        hideCriminalHistory,
        fetchAndShowCrimeById,
        handleCriminalHistoryClick,
      }}
    >
      {children}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4 sm:px-6">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[525px] max-h-[90vh] overflow-auto p-6 sm:p-8">
            {/* Close Button */}
            <button
              onClick={hideCriminalHistory}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer text-2xl font-bold transition"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Criminal History
              </h2>
              {loading && (
                <p className="text-sm text-gray-500 mt-1">Loading...</p>
              )}
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>

            {/* Content */}
            <div className="space-y-4 w-full">
              <CriminalHistoryModal crimes={crimes as Crime[]} />
            </div>
          </div>
        </div>
      )}
    </CriminalHistoryContext.Provider>
  );
};
