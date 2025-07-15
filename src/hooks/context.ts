import { createContext } from "react";
import type { Game } from "../types/game";

export interface CartContextValue {
  cart: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined
);
