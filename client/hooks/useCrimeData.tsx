"use client";
import { useState } from "react";
import { Crime } from "../types/Crime";
import { _fetchCrimeById } from "../requests/crimeRequests";

const useCrimeData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCrimeById = async (id: string): Promise<Crime | null> => {
    setLoading(true);
    setError("");

    try {
      const response = await _fetchCrimeById(id);
      return response;
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch crime data");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchCrimeById,
  };
};

export default useCrimeData;