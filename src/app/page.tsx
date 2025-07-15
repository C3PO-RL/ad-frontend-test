"use client";

import React, { useContext } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchGames } from "../services/api";
import { Game } from "../types/game";
import { CartProvider } from "../hooks/provider";
import { CartContext } from "../hooks/context";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { GameCard } from "../components/GameCard";
import { GenreFilter } from "../components/GenreFilter";
import { LoadingIndicator } from "../components/LoadingIndicator";

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

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [games, setGames] = React.useState<Game[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [total, setTotal] = React.useState(0);

  const genre = searchParams.get("genre") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartContext must be used within a CartProvider");
  const { cart, addToCart, removeFromCart, isInCart } = ctx;

  React.useEffect(() => {
    setLoading(true);
    fetchGames({ genre: genre || undefined, page })
      .then((res) => {
        setGames(res.games);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [genre, page]);

  const handleGenreChange = (newGenre: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newGenre) {
      params.set("genre", newGenre);
      params.set("page", "1");
    } else {
      params.delete("genre");
      params.set("page", "1");
    }
    router.push(`/?${params.toString()}`);
  };

  const handleSeeMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page + 1));
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-2xl font-bold">Top Sellers</h1>
          <GenreFilter
            genres={GENRES}
            selected={genre}
            onChange={handleGenreChange}
          />
        </div>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  inCart={isInCart(game.id)}
                  onAddToCart={addToCart}
                  onRemoveFromCart={removeFromCart}
                />
              ))}
            </div>
            {games.length < total && (
              <div className="flex justify-center mt-8">
                <button
                  className="px-6 py-2 border rounded font-semibold bg-gray-200 hover:bg-gray-300"
                  onClick={handleSeeMore}
                >
                  See More
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <CatalogContent />
    </CartProvider>
  );
}
