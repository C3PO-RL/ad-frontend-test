"use server";

import { Game } from "@/types/game";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  genre: string;
  description: string;
  isNew: boolean;
}

export interface CartResponse {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Mock cart data - in a real app this would come from a database
let mockCart: CartItem[] = [];

export async function getCart(): Promise<CartResponse> {
  const total = mockCart.reduce((sum, item) => sum + item.price, 0);
  const itemCount = mockCart.length;

  return {
    items: mockCart,
    total,
    itemCount,
  };
}

export async function addToCart(game: Game): Promise<CartResponse> {
  const cartItem: CartItem = {
    id: game.id,
    name: game.name,
    price: game.price,
    image: game.image,
    genre: game.genre,
    description: game.description,
    isNew: game.isNew,
  };

  mockCart.push(cartItem);

  return getCart();
}

export async function removeFromCart(gameId: string): Promise<CartResponse> {
  mockCart = mockCart.filter((item) => item.id !== gameId);

  return getCart();
}

export async function clearCart(): Promise<CartResponse> {
  mockCart = [];

  return getCart();
}
