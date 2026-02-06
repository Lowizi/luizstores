"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Package, Settings, LogOut, User } from "lucide-react";

/**
 * Dashboard Sidebar Component
 * 
 * Displays user info and navigation for the dashboard area.
 * Highlights the active page.
 */

interface DashboardSidebarProps {
  userName: string;
  userEmail: string;
}

export default function DashboardSidebar({ userName, userEmail }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/orders", label: "Orders", icon: Package },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    // Clear auth cookie
    document.cookie = "auth_token=; path=/; max-age=0";
    document.cookie = "pending_verification=; path=/; max-age=0";
    
    // Redirect to home page
    router.push("/");
  };

  return (
    <aside className="w-60 bg-white min-h-screen flex flex-col border-r border-gray-200">
      {/* User Profile - Dark header like Figma */}
      <div className="bg-zinc-800 text-white p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-600 flex items-center justify-center">
            <User size={20} className="text-zinc-300" />
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold text-sm truncate">{userName}</p>
            <p className="text-xs text-zinc-400 truncate">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-gray-100 text-black border-l-3 border-black"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-5 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-black transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
