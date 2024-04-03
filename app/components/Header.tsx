import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-4">
      <div className="text-center m-10">
        <h1 className="text-white font-bold mb-2 text-5xl">
          Find your table for any occasion
        </h1>
        <SearchBar />
      </div>
    </div>
  );
}
