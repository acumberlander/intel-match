"use client";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import useSearch from "@/hooks/useSearch";
import { CriminalHistoryProvider } from "@/context/CriminalHistoryContext";

export default function HomePage() {
   const {
     query,
     setQuery,
     sensitivity,
     setSensitivity,
     handleSubmit,
     loading,
     error,
     results,
     resultType,
     responseMessage,
   } = useSearch();

   const searchResultProps = {
     loading,
     error,
     results,
     resultType,
     responseMessage,
   };

   const formProps = {
     query,
     setQuery,
     sensitivity,
     setSensitivity,
     handleSubmit,
   };

  return (
    <CriminalHistoryProvider>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Semantic Search</h1>
        <SearchResults {...searchResultProps} />
        <SearchForm {...formProps} />
      </main>
    </CriminalHistoryProvider>
  );
}
