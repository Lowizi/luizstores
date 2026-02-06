"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, Heart, Wallet, ChevronRight, ChevronLeft, Menu, X } from "lucide-react";
import DashboardSidebar from "@/components/ui/DashboardSidebar";

/**
 * Buyer Dashboard Page
 * 
 * Main dashboard for logged-in buyers showing:
 * - Overview stats (orders, wishlist, balance)
 * - Recent orders with status
 * - Recommended products
 * 
 * Later this data will come from Django API
 */

// Mock data - will come from Django backend later
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
};

const mockStats = {
  totalOrders: 5,
  wishlistItems: 12,
  accountBalance: 120.50,
};

const mockOrders = [
  { id: "#1023", date: "Apr 22, 2024", total: 45.00, status: "Delivered" },
  { id: "#1022", date: "Apr 15, 2024", total: 120.00, status: "Shipped" },
  { id: "#1021", date: "Apr 10, 2024", total: 75.00, status: "Delivered" },
  { id: "#1020", date: "Apr 05, 2024", total: 55.00, status: "Delivered" },
  { id: "#1019", date: "Mar 28, 2024", total: 89.00, status: "Delivered" },
  { id: "#1018", date: "Mar 20, 2024", total: 150.00, status: "Delivered" },
];

const mockRecommended = [
  { id: 1, name: "Smart Watch", price: 129.99, image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=300&h=300&fit=crop" },
  { id: 2, name: "Noise-Cancelling", price: 99.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop" },
  { id: 3, name: "Leather Backpack", price: 85.00, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop" },
  { id: 4, name: "Product Name", price: 89.99, image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=300&h=300&fit=crop" },
];

// Orders per page for pagination
const ORDERS_PER_PAGE = 3;

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Pagination logic
  const totalPages = Math.ceil(mockOrders.length / ORDERS_PER_PAGE);
  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const currentOrders = mockOrders.slice(startIndex, startIndex + ORDERS_PER_PAGE);

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar - collapsible */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} transition-all duration-300`}>
        <DashboardSidebar userName={mockUser.name} userEmail={mockUser.email} />
      </div>

      {/* Main Content - with left margin when sidebar open */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'ml-4' : ''}`}>
        {/* Top Header */}
        <header className="bg-black text-white h-14 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Hamburger Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 hover:bg-zinc-800 rounded transition-colors"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/" className="text-xl font-bold italic">
              LuizStores
            </Link>
          </div>
          
          {/* Right side nav - pushed to right */}
          <nav className="flex items-center gap-8">
            <Link href="/shop" className="flex items-center gap-1.5 text-sm hover:text-gray-300">
              <Package size={16} />
              Shop
            </Link>
            <Link href="/dashboard/orders" className="flex items-center gap-1.5 text-sm hover:text-gray-300">
              <Package size={16} />
              Orders
            </Link>
            <Link href="/dashboard/settings" className="text-sm hover:text-gray-300">
              Profile
            </Link>
            <span className="text-sm text-gray-300 pl-4 border-l border-gray-600">{mockUser.email}</span>
          </nav>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-10">
          {/* Welcome */}
          <div className="mb-12">
            <h1 className="text-2xl font-bold">Welcome, {mockUser.name}!</h1>
            <p className="text-gray-600 mt-2">Here&apos;s an overview of your account activity.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Total Orders */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <Package size={20} className="text-gray-500" />
                <span className="text-sm text-gray-600">Total Orders</span>
              </div>
              <p className="text-3xl font-bold">{mockStats.totalOrders}</p>
              <Link href="/dashboard/orders" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
                View Orders
              </Link>
            </div>

            {/* Wishlist Items */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <Heart size={20} className="text-gray-500" />
                <span className="text-sm text-gray-600">Wishlist Items</span>
              </div>
              <p className="text-3xl font-bold">{mockStats.wishlistItems}</p>
              <Link href="/dashboard/wishlist" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
                View Wishlist
              </Link>
            </div>

            {/* Account Balance */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <Wallet size={20} className="text-gray-500" />
                <span className="text-sm text-gray-600">Account Balance</span>
              </div>
              <p className="text-3xl font-bold">${mockStats.accountBalance.toFixed(2)}</p>
              <Link href="/dashboard/balance" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
                View Balance
              </Link>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white border border-gray-200 rounded-lg mb-12">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left text-sm font-medium text-gray-500 px-5 py-3">Order ID</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-5 py-3">Date</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-5 py-3">Total</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-5 py-3">Status</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-5 py-4 text-sm font-medium">{order.id}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{order.date}</td>
                      <td className="px-5 py-4 text-sm font-medium">${order.total.toFixed(2)}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link href={`/dashboard/orders/${order.id}`} className="text-gray-400 hover:text-black">
                          <ChevronRight size={18} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination & View All */}
            <div className="p-4 flex items-center justify-between border-t border-gray-200">
              {/* Pagination */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded text-sm font-medium ${
                      currentPage === page
                        ? "bg-black text-white"
                        : "border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* View All Link */}
              <Link href="/dashboard/orders" className="text-sm text-gray-600 hover:text-black flex items-center gap-1">
                View All Orders
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Recommended Products */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold mb-6">Recommended Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {mockRecommended.map((product) => (
                <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="relative h-32 bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                    <Link
                      href={`/product/${product.id}`}
                      className="mt-2 block text-center text-sm border-2 border-black rounded py-1.5 hover:bg-black hover:text-white transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-6 px-10 text-center text-sm text-gray-500">
          © 2024 LuizStores. Privacy Policy | Terms of Service
        </footer>
      </div>
    </div>
  );
}
