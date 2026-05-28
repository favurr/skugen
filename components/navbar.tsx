'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                SKU Gen
              </span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Products
            </Link>
          </div>
          <div className="md:hidden">
            <button
              className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
              aria-label="Open menu"
            >
              ≡
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}