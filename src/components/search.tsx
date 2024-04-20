"use client";

import { XIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useDebounceCallback } from "usehooks-ts";
import { useQueryState } from "nuqs";

export const Search = () => {
  const [search, setSearch] = useQueryState("search", {
    shallow: false,
  });

  const handleSearch = useDebounceCallback((value: string) => {
    setSearch(value);
  }, 200);

  return (
    <div className="flex gap-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search"
          name="search"
          defaultValue={search || ""}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {search && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() => setSearch(null)}
          >
            <XIcon className="w-4 h-4 " />
          </button>
        )}
      </div>
    </div>
  );
};
