"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { removeFromCart } from "../actions/cart";
import { CartItem as CartItemType } from "../actions/cart";
import { CartItem } from "./CartItem";

interface CartInteractionsProps {
  cart: CartItemType[];
}

export const CartInteractions: React.FC<CartInteractionsProps> = ({ cart }) => {
  const router = useRouter();

  const handleRemove = async (gameId: string) => {
    await removeFromCart(gameId);
    router.refresh();
  };

  return (
    <>
      {cart.map((item) => (
        <CartItem key={item.id} game={item} onRemove={handleRemove} />
      ))}
    </>
  );
};
