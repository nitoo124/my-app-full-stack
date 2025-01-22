"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "../(store)/store";

function Header() {
  const { user } = useUser();

  // Correctly calculating itemCount using Zustand store
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="bg-white shadow-md">
      {/* Wrapper */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-4xl font-bold text-purple-600 hover:opacity-80"
          >
            DealHaven
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 hidden sm:block">
          <form action="/search" className="relative">
            <input
              type="text"
              name="query"
              placeholder="Search for Products"
              className="w-full bg-gray-100 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 outline-none"
            />
          </form>
        </div>

        {/* Icons and User Section */}
        <div className="flex items-center space-x-6">
          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <TrolleyIcon className="w-6 h-6 text-gray-700 hover:text-purple-500" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* User Section */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="flex items-center bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700 space-x-2"
              >
                <PackageIcon className="w-5 h-5" />
                <span>My Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-500">Welcome Back</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  Sign In
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="block sm:hidden px-4 py-2">
        <form action="/search" className="relative">
          <input
            type="text"
            name="query"
            placeholder="Search for Products"
            className="w-full bg-gray-100 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 outline-none"
          />
        </form>
      </div>
    </header>
  );
}

export default Header;
