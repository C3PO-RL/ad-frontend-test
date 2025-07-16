"use client";

import React, { useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GenreFilter } from "./GenreFilter";
import { GamesList } from "./GamesList";
import { LoadingIndicator } from "./LoadingIndicator";
import { Game } from "../types/game";

const GENRES = [
  "Action",
  "Adventure",
  "RPG",
  "Shooter",
  "Battle Royale",
  "Sports",
  "Racing",
  "Puzzle",
  "Strategy",
  "Simulation",
  "Platformer",
  "Horror",
  "MMO",
  "Fighting",
  "Stealth",
  "Survival",
  "Open World",
  "Sandbox",
  "Other",
];

interface FeedProps {
  games: Game[];
  total: number;
  currentPage: number;
  loading: boolean;
  cartItems: string[];
}

export const Feed: React.FC<FeedProps> = ({
  games,
  total,
  currentPage,
  loading,
  cartItems,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const genre = searchParams.get("genre") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const handleSeeMore = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page + 1));
      router.push(`/?${params.toString()}`);
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold">Top Sellers</h1>
        <Suspense
          fallback={
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
          }
        >
          <GenreFilter genres={GENRES} selected={genre} />
        </Suspense>
      </div>
      {loading || isPending ? (
        <LoadingIndicator />
      ) : (
        <Suspense fallback={<LoadingIndicator />}>
          <GamesList
            games={games}
            total={total}
            currentPage={currentPage}
            onSeeMore={handleSeeMore}
            cartItems={cartItems}
          />
        </Suspense>
      )}
    </>
  );
};
