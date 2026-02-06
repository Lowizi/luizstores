"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";
import ProductCarousel from "@/components/ui/ProductCarousel";

/**
 * Home Page (Landing Page)
 * 
 * Key Next.js concepts demonstrated:
 * 
 * 1. "use client" - We made this a Client Component because:
 *    - Pagination requires useState (state only works client-side)
 *    - Search will need state too later
 * 
 * 2. Pagination Logic:
 *    - ITEMS_PER_PAGE: How many products per page (8)
 *    - We slice allProducts array based on current page
 *    - slice(start, end) extracts a portion of an array
 *    
 *    Example: Page 1 → slice(0, 8) → products 1-8
 *             Page 2 → slice(8, 16) → products 9-16
 * 
 * 3. Math.ceil():
 *    - Rounds UP to nearest whole number
 *    - 16 products / 8 per page = 2 pages
 *    - 17 products / 8 per page = 2.125 → ceil → 3 pages
 */

// Product data with real Unsplash images
// Later these will come from your Django API / Cloudinary
// Unsplash URL format: images.unsplash.com/photo-ID?w=WIDTH&h=HEIGHT&fit=crop
// The ?w=400&h=400&fit=crop part tells Unsplash to resize the image for us
const allProducts = [
  { id: 1, name: "Sneakers", price: 59.99, seller: "TrendyKicks", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop" },
  { id: 2, name: "Wristwatch", price: 129.99, seller: "EliteWatches", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop" },
  { id: 3, name: "Leather Backpack", price: 89.99, seller: "UrbanGear", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop" },
  { id: 4, name: "Wireless Headphones", price: 99.99, seller: "SoundWave", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" },
  { id: 5, name: "Digital Camera", price: 499.99, seller: "PhotoWorld", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop" },
  { id: 6, name: "Modern Chair", price: 120.00, seller: "HomeEssence", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop" },
  { id: 7, name: "Laptop", price: 899.99, seller: "TechHub", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop" },
  { id: 8, name: "Ceramic Vase", price: 39.99, seller: "DecoCraft", image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=400&h=400&fit=crop" },
  { id: 9, name: "Running Shoes", price: 79.99, seller: "TrendyKicks", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop" },
  { id: 10, name: "Smart Watch", price: 199.99, seller: "EliteWatches", image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop" },
  { id: 11, name: "Travel Bag", price: 69.99, seller: "UrbanGear", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=400&fit=crop" },
  { id: 12, name: "Studio Headphones", price: 149.99, seller: "SoundWave", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop" },
  { id: 13, name: "Action Camera", price: 299.99, seller: "PhotoWorld", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop" },
  { id: 14, name: "Office Chair", price: 220.00, seller: "HomeEssence", image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop" },
  { id: 15, name: "Gaming Laptop", price: 1299.99, seller: "TechHub", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop" },
  { id: 16, name: "Flower Pot", price: 24.99, seller: "DecoCraft", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop" },
];

// How many products to show per page
const ITEMS_PER_PAGE = 8;

export default function Home() {
  // State to track the current page number
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages: ceil(16 / 8) = 2
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

  // Get products for the current page using array slice
  // Page 1: slice(0, 8) → indices 0-7
  // Page 2: slice(8, 16) → indices 8-15
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = allProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Split the current page products into two rows (like the Figma layout)
  const row1 = currentProducts.slice(0, 4);
  const row2 = currentProducts.slice(4, 8);

  // Handle page change - also scrolls to top of products
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of products section
    document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section — stacked vertically, everything centered */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "60px",
          paddingBottom: "70px",
          background:
            "radial-gradient(ellipse at center, #ffffff 0%, #f3f4f6 60%, #e5e7eb 100%)",
        }}
      >
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700 }}>
          Welcome to LuizStores
        </h1>

        <p
          style={{
            color: "#6b7280",
            fontSize: "1.05rem",
            marginTop: "24px",
          }}
        >
          Your marketplace for buyers and sellers.
        </p>

        {/* Search Bar — truly centered, icon separated from text */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "380px",
            marginTop: "36px",
          }}
        >
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            placeholder="Search for products..."
            style={{
              width: "100%",
              height: "44px",
              paddingLeft: "42px",
              paddingRight: "16px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              color: "#000",
              backgroundColor: "#fff",
              outline: "none",
            }}
          />
        </div>

        {/* CTA Button */}
        <div style={{ marginTop: "36px" }}>
          <Link
            href="/signup"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#000",
              color: "#fff",
              padding: "10px 40px",
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            Start Shopping
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <main
        id="products-section"
        style={{ flex: 1, paddingTop: "50px", paddingBottom: "60px" }}
      >
        <div className="max-w-7xl" style={{ margin: "0 auto", padding: "0 24px" }}>
          {/* Row 1 */}
          <ProductCarousel
            ariaLabel="Featured products row 1"
            products={row1}
            renderItem={(p) => <ProductCard {...p} />}
          />

          {/* Vertical space between rows */}
          <div style={{ height: "48px" }} />

          {/* Row 2 */}
          <ProductCarousel
            ariaLabel="Featured products row 2"
            products={row2}
            renderItem={(p) => <ProductCard {...p} />}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ marginTop: "48px" }}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
