"use client";
import useBasketStore from "@/app/(store)/store";
import { Products } from "../../../../sanity.types";
import { useEffect, useState } from "react";

interface AddToBasketProps {
  product: Products;
  disabled?: boolean;
}

function AddToBasket({ product, disabled }: AddToBasketProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id); // Get item count from the store
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure client-side rendering
  }, []);

  if (!isClient) {
    return null; // Prevent rendering on the server
  }

  return (
    <div
      className={`flex items-center justify-center space-x-3 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {/* Remove Item Button */}
      <button
        onClick={() => removeItem(product._id)}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-xl shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled || itemCount === 0}
      >
        -
      </button>

      {/* Item Count Display */}
      <span className="w-8 text-center font-semibold text-lg text-gray-800">
        {itemCount}
      </span>

      {/* Add Item Button */}
      <button
        onClick={() => addItem(product)}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-xl shadow-md hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled}
      >
        +
      </button>
    </div>
  );
}

export default AddToBasket;