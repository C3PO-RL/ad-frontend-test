import React from "react";
import { LoadingIndicator } from "../../components/LoadingIndicator";

export default function CartLoading() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-2 text-gray-700 text-sm">
        <span className="text-lg">&larr;</span> Back to Catalog
      </div>
      <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
      <div className="text-gray-500 mb-6">Loading items...</div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <LoadingIndicator />
        </div>
        <div className="lg:w-[340px] w-full">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Loading...</span>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <span>Loading...</span>
              </div>
            </div>
          </div>
          <button
            className="mt-6 w-full py-3 rounded bg-gray-700 text-white font-semibold text-lg opacity-50"
            disabled
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
