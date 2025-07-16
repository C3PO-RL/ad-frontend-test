"use client";

import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface GenreFilterProps {
  genres: string[];
  selected: string;
  handleGenreChange: (newGenre: string) => void;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selected,
  handleGenreChange,
}) => {
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
      >
        <option value="">All</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};
