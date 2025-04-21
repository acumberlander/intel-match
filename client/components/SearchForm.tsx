"use client";
import React from "react";

interface SearchFormProps {
  query: string;
  setQuery: (value: string) => void;
  sensitivity: number;
  setSensitivity: (value: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const SearchForm = ({ query, setQuery, sensitivity, setSensitivity, handleSubmit }: SearchFormProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={4}
          placeholder="Describe a suspect, a vehicle, or both..."
          className="w-full p-3 border rounded resize-none"
        />

        <div>
          <label className="block text-sm font-medium mb-1">
            Sensitivity: {sensitivity?.toFixed(2)}
          </label>
          <input
            type="range"
            min={0.1}
            max={1.0}
            step={0.05}
            value={sensitivity?.toFixed(2)}
            onChange={(e) => setSensitivity(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
