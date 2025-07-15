"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { CartProvider } from "../../hooks/provider";
import { CartContext } from "../../hooks/context";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { CartItem } from "../../components/CartItem";
import { OrderSummary } from "../../components/OrderSummary";

function CartContent() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartContext must be used within a CartProvider");
  const { cart, removeFromCart } = ctx;
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        <button
          className="mb-6 flex items-center gap-2 text-gray-700 hover:underline text-sm"
          onClick={() => router.push("/")}
        >
          <span className="text-lg">&larr;</span> Back to Catalog
        </button>
        <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
        <div className="text-gray-500 mb-6">
          {cart.length} item{cart.length !== 1 ? "s" : ""}
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {cart.length === 0 ? (
              <div className="text-gray-400 text-center py-16">
                Your cart is empty.
              </div>
            ) : (
              cart.map((game) => (
                <CartItem key={game.id} game={game} onRemove={removeFromCart} />
              ))
            )}
          </div>
          <div className="lg:w-[340px] w-full">
            <OrderSummary games={cart} />
            <button
              className="mt-6 w-full py-3 rounded bg-gray-700 text-white font-semibold text-lg disabled:opacity-50"
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <CartContent />
    </CartProvider>
  );
}
