import React from "react";
import { CartContent } from "../../components/CartContent";
import { getCart } from "../../actions/cart";

export default async function CartPage() {
  const { items: cart, itemCount } = await getCart();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <CartContent cart={cart} itemCount={itemCount} />
    </div>
  );
}
