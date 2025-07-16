"use client";
import React, { Suspense, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { OrderSummary } from "./OrderSummary";
import { CartInteractions } from "./CartInteractions";
import { LoadingIndicator } from "./LoadingIndicator";

export const CartContent: React.FC = ({}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const cart =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [];

  const itemCount = cart.length;

  const handleBack = () => {
    startTransition(() => {
      router.push("/");
    });
  };

  return (
    <>
      <button
        type="button"
        className="mb-6 flex items-center gap-2 text-gray-700 hover:underline text-sm disabled:opacity-50"
        onClick={handleBack}
        disabled={isPending}
      >
        <span className="text-lg">&larr;</span>{" "}
        {isPending ? "Loading..." : "Back to Catalog"}
      </button>
      <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
      <div className="text-gray-500 mb-6">
        {itemCount} item{itemCount !== 1 ? "s" : ""}
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {cart.length === 0 ? (
            <div className="text-gray-400 text-center py-16">
              Your cart is empty.
            </div>
          ) : (
            <Suspense fallback={<LoadingIndicator />}>
              <CartInteractions cart={cart} />
            </Suspense>
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
    </>
  );
};
