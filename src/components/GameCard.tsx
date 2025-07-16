import React, { useTransition } from "react";
import Image from "next/image";
import type { Game } from "../types/game";
import { useRouter } from "next/navigation";
import { addToCart, removeFromCart } from "../actions/cart";

interface GameCardProps {
  game: Game;
  inCart: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, inCart }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = (game: Game) => {
    startTransition(async () => {
      await addToCart(game);

      router.refresh();
    });
  };

  const handleRemoveFromCart = (gameId: string) => {
    startTransition(async () => {
      await removeFromCart(gameId);

      router.refresh();
    });
  };
  return (
    <div className="border rounded-lg p-4 flex flex-col shadow-sm bg-white relative">
      {game.isNew && (
        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          New
        </span>
      )}
      <Image
        src={game.image}
        alt={game.name}
        width={400}
        height={160}
        className="w-full h-40 object-cover rounded mb-4"
      />
      <div className="text-xs text-gray-500 mb-1">GENRE</div>
      <div className="font-semibold text-sm mb-1">{game.genre}</div>
      <div className="font-bold text-lg mb-1">{game.name}</div>
      <div className="text-gray-600 text-xs mb-2 line-clamp-2">
        {game.description}
      </div>
      <div className="flex items-center justify-between mt-auto">
        <span className="font-semibold text-base">${game.price}</span>
      </div>
      <button
        className={`mt-4 w-full border rounded py-2 font-medium transition-colors ${
          inCart
            ? "bg-gray-200 text-gray-700 border-gray-400"
            : "bg-white text-black border-black hover:bg-gray-100"
        } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() =>
          inCart ? handleRemoveFromCart(game.id) : handleAddToCart(game)
        }
        disabled={isPending}
      >
        {isPending ? "Loading..." : inCart ? "Remove" : "Add to Cart"}
      </button>
    </div>
  );
};
