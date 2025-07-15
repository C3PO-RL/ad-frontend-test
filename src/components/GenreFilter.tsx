import React from "react";

interface GenreFilterProps {
  genres: string[];
  selected: string;
  onChange: (genre: string) => void;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selected,
  onChange,
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
        onChange={(e) => onChange(e.target.value)}
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
