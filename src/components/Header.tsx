"use client";
import React from "react";
import Link from "next/link";

export const Header: React.FC = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const itemCount = cart.length;

  return (
    <header className="w-full bg-gray-100 py-4 px-6 flex items-center justify-between border-b">
      <Link href="/" className="text-xl font-semibold tracking-tight">
        GamerShop
      </Link>
      <Link href="/cart" className="relative">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="inline-block"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1 min-w-[18px] text-center">
            {itemCount}
          </span>
        )}
      </Link>
    </header>
  );
};
