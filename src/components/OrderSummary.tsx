import React from "react";
import type { Game } from "../types/game";

interface OrderSummaryProps {
  games: Game[];
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ games }) => {
  const total = games.reduce((sum, g) => sum + g.price, 0);
  return (
    <div className="border rounded-lg p-6 bg-white min-w-[300px]">
      <div className="font-bold text-lg mb-2">Order Summary</div>
      <div className="text-sm mb-4">
        {games.length} item{games.length !== 1 ? "s" : ""}
      </div>
      <div className="mb-4">
        {games.map((game) => (
          <div key={game.id} className="flex justify-between text-sm mb-1">
            <span>{game.name}</span>
            <span>${game.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="border-t pt-2 flex justify-between font-bold text-base">
        <span>Order Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};
