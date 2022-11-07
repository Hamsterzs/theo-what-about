import React, { useState } from "react";
import { useVodSearch } from "../store/vodSearch";
import { trpc } from "../utils/trpc";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { search: currentSearch, setSearch: setCurrentSearch } = useVodSearch();

  trpc.vod.getAll.useQuery(currentSearch);

  const handleSearch = () => {
    setCurrentSearch(search);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex h-12 items-center justify-center bg-primary">
      <input
        placeholder="Search"
        className="h-4/5 w-2/5 rounded-md text-center text-xl"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className="mx-2 h-4/5 rounded-md border-2 bg-white px-8"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Navbar;
