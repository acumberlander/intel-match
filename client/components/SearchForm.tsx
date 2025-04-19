"use client";

import { useState } from "react";
import axios from "axios";
import { SearchResult } from "../types/SearchResult";
import { Person } from "../types/Person";
import PeopleList from "./PeopleList";
import VehiclesList from "./VehicleList";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState<SearchResult[]>([]);
  const [vehicles, setVehicles] = useState<SearchResult[]>([]);
  const [sensitivity, setSensitivity] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5001/search", {
        query,
        sensitivity,
      });
      setPeople(res.data.topPeople.slice(0, 5));
      setVehicles(res.data.topVehicles.slice(0, 5));
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-12 mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border p-3 rounded"
          placeholder="Describe a person or vehicle..."
          rows={4}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sensitivity: {sensitivity.toFixed(2)}
          </label>
          <input
            type="range"
            min={0.1}
            max={1.0}
            step={0.05}
            value={sensitivity}
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

      {loading && <p className="mt-4 text-gray-600">Searching...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      <div className="flex justify-between items-center">
        {people.length > 0 && (
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mt-6 mb-2">
              Top Matching People
            </h2>
            <PeopleList people={people} />
          </div>
        )}

        {vehicles.length > 0 && (
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mt-6 mb-2">
              Top Matching Vehicles
            </h2>
            <VehiclesList vehicles={vehicles} />
          </div>
        )}
      </div>
    </div>
  );
}
