import React from "react";
import { CartContent } from "../../components/CartContent";
import { getCart } from "../../actions/cart";

export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<{
    action?: string;
    itemId?: string;
  }>;
}) {
  const params = await searchParams;

  // Handle cart actions if needed
  if (params.action === "remove" && params.itemId) {
    // This would be handled by the client component
  }

  const { items: cart, total, itemCount } = await getCart();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <CartContent cart={cart} total={total} itemCount={itemCount} />
    </div>
  );
}
