import React from "react";
import type { Game } from "../types/game";

interface CartItemProps {
  game: Game;
  onRemove: (gameId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ game, onRemove }) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0 relative">
      <img
        src={game.image}
        alt={game.name}
        className="w-28 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <div className="text-xs text-gray-500 mb-1">GENRE</div>
        <div className="font-semibold text-sm mb-1">{game.genre}</div>
        <div className="font-bold text-base mb-1 flex items-center gap-2">
          {game.name}
          {game.isNew && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
              New
            </span>
          )}
        </div>
        <div className="text-gray-600 text-xs mb-1">{game.description}</div>
      </div>
      <div className="font-semibold text-lg min-w-[60px] text-right">
        ${game.price}
      </div>
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg"
        aria-label="Remove from cart"
        onClick={() => onRemove(game.id)}
      >
        &times;
      </button>
    </div>
  );
};
