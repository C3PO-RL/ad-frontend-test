"use client";

import React, { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { GameCard } from "./GameCard";
import { Game } from "../types/game";
import { addToCart, removeFromCart } from "../actions/cart";

interface GamesListProps {
  games: Game[];
  total: number;
  currentPage: number;
  onSeeMore: () => void;
  cartItems: string[]; // Array of game IDs in cart
}

export const GamesList: React.FC<GamesListProps> = ({
  games,
  total,
  currentPage,
  onSeeMore,
  cartItems,
}) => {
  const isInCart = (gameId: string) => cartItems.includes(gameId);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} inCart={isInCart(game.id)} />
        ))}
      </div>
      {games.length < total && (
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 border rounded font-semibold bg-gray-200 hover:bg-gray-300"
            onClick={onSeeMore}
          >
            See More
          </button>
        </div>
      )}
    </>
  );
};
