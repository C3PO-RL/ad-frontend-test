import type { Game } from "../types/game";

export interface CartState {
  items: Game[];
}

export type CartAction =
  | { type: "ADD"; game: Game }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" }
  | { type: "INIT"; items: Game[] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD":
      if (state.items.find((item) => item.id === action.game.id)) return state;
      return { items: [...state.items, action.game] };
    case "REMOVE":
      return { items: state.items.filter((item) => item.id !== action.id) };
    case "CLEAR":
      return { items: [] };
    case "INIT":
      return { items: action.items };
    default:
      return state;
  }
}
