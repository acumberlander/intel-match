import SearchForm from "@/components/SearchForm";

export default function HomePage() {
  return (
    <main className="text-black min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Semantic Search</h1>
      <SearchForm />
    </main>
  );
}
