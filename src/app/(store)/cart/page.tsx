"use client";

import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import useBasketStore from "../store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddToBasket from "@/app/components/pages/addToBasket";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Loader from "@/app/components/pages/loader";
import { createCheckoutSession, Metadata } from "../../../../action/createCheckoutSession";

function Cartpage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart</h1>
        <p className="text-gray-600 text-lg italic">Looks like your cart is empty!</p>
      </div>
    );
  }

  const handleCheckOut = async () => {
    if (isSignedIn) {
      setIsLoading(true);
      try {
        const metadata: Metadata = {
          orderNumber: crypto.randomUUID(),
          customerName: user?.fullName ?? "Unknown",
          customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
          clerkUserId: user!.id,
        };
        const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        }
      } catch (error) {
        console.error("Error during checkout:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-8">
      <div className="w-full mx-4 sm:mx-auto p-4 sm:p-6 max-w-6xl bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-900 text-center">
          Your Cart
        </h1>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items Section */}
          <div className="flex-grow">
            {groupedItems?.map((item) => (
              <div
                key={item.product._id}
                className="mb-4 sm:mb-6 border border-gray-200 p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between bg-white hover:shadow-lg transition-shadow"
              >
                {/* Product Image and Details */}
                <div
                  className="flex items-center gap-4 sm:gap-6 cursor-pointer w-full sm:w-auto"
                  onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                >
                  <div className="p-2 sm:p-3 overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
                    {item.product.image && (
                      <Image
                        src={urlFor(item.product.image).url()}
                        alt="Product Image"
                        width={80}
                        height={80}
                        loading="lazy"
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {item.product.name}
                    </h2>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      Price: <span className="font-bold">${((item.product.price ?? 0) * item.quantity).toFixed(2)}</span>
                    </p>
                  </div>
                </div>

                {/* AddToBasket Component */}
                <div className="mt-4 sm:mt-0">
                  <AddToBasket product={item.product} />
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="w-full lg:w-1/3 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
              Order Summary
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <p className="flex justify-between text-gray-700 text-base sm:text-lg">
                <span>Items:</span>
                <span>{groupedItems.reduce((total, item) => total + item.quantity, 0)}</span>
              </p>
              <p className="flex justify-between text-xl sm:text-2xl font-bold border-t pt-3 sm:pt-4 text-gray-900">
                <span>Total:</span>
                <span>$ {useBasketStore.getState().getTotalPrice().toFixed(2)}</span>
              </p>
            </div>

            {/* Checkout Button */}
            {isSignedIn ? (
              <button
                onClick={handleCheckOut}
                disabled={isLoading}
                className="mt-6 w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-base sm:text-lg rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? "Processing..." : "Checkout"}
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="mt-6 w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold text-base sm:text-lg rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all">
                  Sign in to Checkout
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartpage;