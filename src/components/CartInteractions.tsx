"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { removeFromCart } from "../actions/cart";
import { CartItem as CartItemType } from "../actions/cart";
import { CartItem } from "./CartItem";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CartInteractionsProps {
  cart: CartItemType[];
}

export const CartInteractions: React.FC<CartInteractionsProps> = ({ cart }) => {
  const router = useRouter();
  const { getItem, setItem } = useLocalStorage<CartItemType[]>("cart");

  // Fallback: if cart is empty or undefined, use localStorage
  let displayCart = cart && cart.length > 0 ? cart : [];
  if (displayCart.length === 0) {
    const localCart = getItem() || [];

    displayCart = localCart.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      genre: item.genre,
      description: item.description,
      isNew: item.isNew,
    }));
  }

  const handleRemove = async (gameId: string) => {
    // Update localStorage
    const currentCart = getItem() || [];
    setItem(currentCart.filter((g) => g.id !== gameId));
    // Server action
    await removeFromCart(gameId);
    router.refresh();
  };

  return (
    <>
      {displayCart.map((item) => (
        <CartItem key={item.id} game={item} onRemove={handleRemove} />
      ))}
    </>
  );
};
