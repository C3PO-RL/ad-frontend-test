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
  cartItems: string[];
}

export const Feed: React.FC<FeedProps> = ({
  games,
  total,
  currentPage,
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
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold">Top Sellers</h1>
        <GenreFilter
          genres={GENRES}
          selected={genre}
          handleGenreChange={handleGenreChange}
        />
      </div>
      {isPending ? (
        <LoadingIndicator />
      ) : (
        <GamesList
          games={games}
          total={total}
          currentPage={currentPage}
          onSeeMore={handleSeeMore}
          cartItems={cartItems}
        />
      )}
    </>
  );
};
