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
      className={`flex items-center justify-center space-x-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {/* Remove Item Button */}
      <button
        onClick={() => removeItem(product._id)}
        className="w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center font-semibold text-2xl justify-center bg-red-500 text-white transition-colors duration-200 hover:bg-red-600 disabled:bg-gray-300"
        disabled={disabled}
      >
        -
      </button>

      {/* Item Count Display */}
      <span className="w-8 text-center font-semibold">{itemCount}</span>

      {/* Add Item Button */}
      <button
        onClick={() => addItem(product)}
        className=" w-6 h-6 sm:w-10 sm:h-10 rounded-full text-2xl font-semibold flex items-center justify-center bg-green-500 text-white transition-colors duration-200 hover:bg-green-600 disabled:bg-gray-300"
        disabled={disabled}
      >
        +
      </button>
    </div>
  );
}

export default AddToBasket;
