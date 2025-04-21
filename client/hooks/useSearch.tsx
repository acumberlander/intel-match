"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [sensitivity, setSensitivity] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [resultType, setResultType] = useState<
    "person" | "vehicle" | "both" | null
  >(null);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    setResultType(null);
    setResponseMessage("");

    try {
      const res = await axios.post("http://localhost:5001/search", {
        query,
        sensitivity,
      });

      setResults(res.data.results);
      setResultType(res.data.type);
      setResponseMessage(res.data.message);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    query,
    setQuery,
    sensitivity,
    setSensitivity,
    loading,
    error,
    results,
    resultType,
    responseMessage,
    handleSubmit,
  };
}

export default useSearch