"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Header Component
 * 
 * This is the navigation bar that appears on all pages.
 * 
 * Key concepts:
 * - "use client": This tells Next.js this component runs in the browser (client-side)
 *   We need this because we use usePathname() hook which only works client-side
 * 
 * - usePathname(): A Next.js hook that returns the current URL path
 *   We use it to highlight the active navigation link
 * 
 * - Link: Next.js component for navigation (faster than <a> tags because
 *   it prefetches pages and doesn't do full page reloads)
 */

export default function Header() {
  const pathname = usePathname();

  // Helper function to check if a link is currently active
  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full text-white bg-black">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold italic tracking-tight">
            LuizStores
          </Link>

          {/* Nav links: plain text like Figma, good spacing, no background highlight */}
          <div className="hidden sm:flex items-center gap-6 sm:gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`text-sm font-medium transition-colors ${
                isActive("/shop") ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Shop
            </Link>
            <Link
              href="/sell"
              className={`text-sm font-medium transition-colors ${
                isActive("/sell") ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Sell
            </Link>
            <Link
              href="/login"
              className={`text-sm font-medium transition-colors ${
                isActive("/login") ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Login
            </Link>
            {/* Sign Up: thin border box like Figma */}
            <Link
              href="/signup"
              className="text-sm font-medium border border-white rounded px-4 py-1 text-white hover:bg-white hover:text-black transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
