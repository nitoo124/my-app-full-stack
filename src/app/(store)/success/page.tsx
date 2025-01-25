"use client";

import { useSearchParams } from "next/navigation";
import useBasketStore from "../store";
import { useEffect } from "react";
import Link from "next/link";

function Page() {
  const SearchParams = useSearchParams();
  const orderNumber = SearchParams.get("orderNumber"); // Get the order number
  const clearBasket = useBasketStore((state) => state.clearBasket);

  useEffect(() => {
    console.log("Order Number:", orderNumber); // Debugging step to confirm the value
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 11l3 3L22 4"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 mt-2">
          Your order has been successfully processed and will be shipped soon.
        </p>

        {/* Order Number */}
        {orderNumber ? (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Order Number:</p>
            <p className="font-mono text-lg text-green-600">{orderNumber}</p>
          </div>
        ) : (
          <p className="mt-4 text-red-600">No Order Number Found!</p>
        )}

        {/* Confirmation Message */}
        <p className="text-gray-600 mt-4">
          A confirmation email has been sent to your registered email address.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
          <Link href="/orders">
            <button className="bg-purple-700 text-white px-6 py-2 rounded-md shadow-lg hover:bg-purple-800 transition duration-200">
              View Order Details
            </button>
          </Link>
          <Link href="/">
            <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md shadow-lg hover:bg-gray-200 transition duration-200">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;


