"use client";

import { useState } from "react";
import axios from "axios";

type SearchResult = {
  id: string;
  description: string;
  similarity: number;
  name?: string; // For people
  age?: number;
  make?: string; // For vehicles
  model?: string;
  color?: string;
};

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState<SearchResult[]>([]);
  const [vehicles, setVehicles] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5001/search", {
        query,
      });
      setPeople(res.data.topPeople);
      setVehicles(res.data.topVehicles);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border p-3 rounded"
          placeholder="Describe a person or vehicle..."
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-gray-600">Searching...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      <div className="mt-6">
        {people.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mb-2">Top Matching People</h2>
            <ul className="space-y-2">
              {people.map((p) => (
                <li key={p.id} className="border p-3 rounded bg-gray-50">
                  <p>
                    <strong>{p.name}</strong> ({p.age})
                  </p>
                  <p className="text-sm">{p.description}</p>
                  <p className="text-xs text-gray-500">
                    Similarity: {p.similarity?.toFixed(3)}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}

        {vehicles.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mt-6 mb-2">
              Top Matching Vehicles
            </h2>
            <ul className="space-y-2">
              {vehicles.map((v) => (
                <li key={v.id} className="border p-3 rounded bg-gray-50">
                  <p>
                    <strong>
                      {v.make} {v.model}
                    </strong>{" "}
                    ({v.color})
                  </p>
                  <p className="text-sm">{v.description}</p>
                  <p className="text-xs text-gray-500">
                    Similarity: {v.similarity?.toFixed(3)}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
