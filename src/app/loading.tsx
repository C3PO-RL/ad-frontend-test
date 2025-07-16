import { LoadingIndicator } from "../components/LoadingIndicator";

export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold">Top Sellers</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="genre-select" className="font-semibold">
            Genre
          </label>
          <select
            id="genre-select"
            className="border rounded px-3 py-2 text-sm"
            disabled
          >
            <option>Loading...</option>
          </select>
        </div>
      </div>
      <LoadingIndicator />
    </div>
  );
}
