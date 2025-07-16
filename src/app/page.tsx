import React, { Suspense } from "react";
import { Feed } from "../components/Feed";
import { fetchGames } from "../actions/games";
import { getCart } from "../actions/cart";
import Loading from "./loading";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    genre?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const genre = params.genre;
  const page = parseInt(params.page || "1", 10);

  const [{ games, total, currentPage }, { items: cartItems, itemCount }] =
    await Promise.all([
      fetchGames({
        genre: genre || undefined,
        page,
      }),
      getCart(),
    ]);

  const cartItemIds = cartItems.map((item) => item.id);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <Suspense fallback={<Loading />}>
        <Feed
          games={games}
          total={total}
          currentPage={currentPage}
          cartItems={cartItemIds}
        />
      </Suspense>
    </div>
  );
}
