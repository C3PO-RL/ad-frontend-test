"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { getCart } from "../actions/cart";

interface HeaderClientProps {
  initialCartCount: number;
}

const HeaderContent: React.FC<{ cartCount: number }> = ({ cartCount }) => {
  return (
    <header className="w-full bg-gray-100 py-4 px-6 flex items-center justify-between border-b">
      <a href="/" className="text-xl font-semibold tracking-tight">
        GamerShop
      </a>
      <a href="/cart" className="relative">
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
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1 min-w-[18px] text-center">
            {cartCount}
          </span>
        )}
      </a>
    </header>
  );
};

export const HeaderClient: React.FC<HeaderClientProps> = ({
  initialCartCount,
}) => {
  const [cartCount, setCartCount] = useState(initialCartCount);
  const router = useRouter();

  useEffect(() => {
    const updateCartCount = async () => {
      try {
        const { itemCount } = await getCart();
        setCartCount(itemCount);
      } catch (error) {
        console.error("Failed to update cart count:", error);
      }
    };

    // Update cart count when the component mounts
    updateCartCount();
  }, []);

  // Update cart count when navigation occurs (after cart actions)
  useEffect(() => {
    const handleRouteChange = () => {
      const updateCount = async () => {
        try {
          const { itemCount } = await getCart();
          setCartCount(itemCount);
        } catch (error) {
          console.error("Failed to update cart count:", error);
        }
      };
      updateCount();
    };

    // Listen for navigation events
    window.addEventListener("focus", handleRouteChange);
    return () => window.removeEventListener("focus", handleRouteChange);
  }, []);

  return (
    <Suspense
      fallback={
        <header className="w-full bg-gray-100 py-4 px-6 flex items-center justify-between border-b">
          <div className="text-xl font-semibold tracking-tight">GamerShop</div>
          <div className="relative">
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
          </div>
        </header>
      }
    >
      <HeaderContent cartCount={cartCount} />
    </Suspense>
  );
};
