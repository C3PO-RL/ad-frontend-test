import React, { useReducer, useCallback, useEffect, ReactNode } from "react";
import { CartContext } from "./context";
import { cartReducer, CartState, CartAction } from "./reducers";
import { useLocalStorage } from "./useLocalStorage";
import type { Game } from "../types/game";

const CART_STORAGE_KEY = "cart_items";

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const { getItem, setItem } = useLocalStorage<Game[]>(CART_STORAGE_KEY);
  const [state, dispatch] = useReducer<React.Reducer<CartState, CartAction>>(
    cartReducer,
    { items: [] }
  );

  // Initialize from localStorage
  useEffect(() => {
    const stored = getItem();
    if (stored) {
      dispatch({ type: "INIT", items: stored });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = useCallback(
    (game: Game) => {
      dispatch({ type: "ADD", game });
      setItem([...state.items, game]);
    },
    [setItem, state.items]
  );

  const removeFromCart = useCallback((id: string) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const isInCart = useCallback(
    (id: string) => {
      return state.items.some((item) => item.id === id);
    },
    [state.items]
  );

  const value = {
    cart: state.items,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
