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
    <header className="bg-white shadow-lg mb-10 sticky top-0 z-50 ">
      {/* Wrapper */}
      <div className=" max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap">
        {/* Logo */}
        <div className=" mb-3 lg:mb-0 flex items-center flex-shrink-0 w-full md:w-auto justify-center md:justify-start">
          <Link
            href="/"
            className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-700 to-black bg-clip-text hover:opacity-80 transition-all ease-in-out duration-300"
          >
            DealHaven.
          </Link>
        </div>

        {/* Search Bar (hidden on small screens) */}
        <div className="flex-1 mx-4 hidden md:block">
          <form action="/search" className="relative">
            <input
              type="text"
              name="query"
              placeholder="Search for Products"
              className="w-full bg-gray-100 px-6 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 outline-none transition duration-300 ease-in-out"
            />
          </form>
        </div>

        {/* Icons and User Section */}
        <div className=" items-center space-x-6 hidden md:block md:flex">
          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative bg-purple-700 text-white p-2 rounded-full hover:bg-purple-800 transition-colors duration-200"
          >
            <TrolleyIcon className="w-7 h-7" />
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
                className="flex items-center bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-800 space-x-2 transition-all duration-300"
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
                  <p className="font-bold text-gray-800">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-800 transition-all duration-300">
                  Sign In
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </div>

      {/* mobile icons */}
      <div className=" flex justify-between px-8 gap-2 mb-2 items-center space-x-6  md:hidden">
          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative bg-purple-700 text-white p-2 rounded-full hover:bg-purple-800 transition-colors duration-200"
          >
            <TrolleyIcon className="w-7 h-7" />
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
                className="flex items-center bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-800 space-x-2 transition-all duration-300"
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
                  <p className="font-bold text-gray-800">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-800 transition-all duration-300">
                  Sign In
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      

      {/* Mobile Search Bar (shown on small screens) */}
      <div className="md:hidden block px-4 py-2">
        <form action="/search" className="relative">
          <input
            type="text"
            name="query"
            placeholder="Search for Products"
            className="w-full bg-gray-100 px-6 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 outline-none transition duration-300 ease-in-out"
          />
        </form>
      </div>
    </header>
  );
}

export default Header;
