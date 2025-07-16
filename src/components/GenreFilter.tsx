"use client";

import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface GenreFilterProps {
  genres: string[];
  selected: string;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selected,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleGenreChange = (newGenre: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (newGenre) {
        params.set("genre", newGenre);
        params.set("page", "1");
      } else {
        params.delete("genre");
        params.set("page", "1");
      }
      router.push(`/?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="genre-select" className="font-semibold">
        Genre
      </label>
      <select
        id="genre-select"
        className="border rounded px-3 py-2 text-sm"
        value={selected}
        onChange={(e) => handleGenreChange(e.target.value)}
        disabled={isPending}
      >
        <option value="">All</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      {isPending && <div className="text-sm text-gray-500">Loading...</div>}
    </div>
  );
};
