"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination Component
 * 
 * This handles page navigation when there are many products.
 * 
 * Key concepts explained:
 * 
 * 1. Props Interface:
 *    - currentPage: Which page we're on right now
 *    - totalPages: Total number of pages available
 *    - onPageChange: Callback function the parent calls when page changes
 *    
 * 2. Callback Pattern:
 *    - Instead of managing state here, we call onPageChange(pageNumber)
 *    - The parent component (Home page) manages which page is active
 *    - This makes Pagination reusable across different pages
 * 
 * 3. Design:
 *    - Round circles with page numbers
 *    - < > arrows for previous/next
 *    - Active page is highlighted (black bg)
 * 
 * 4. Math.max / Math.min:
 *    - Used to prevent going below page 1 or above totalPages
 *    - This is defensive programming - prevents bugs
 */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  /**
   * Generate array of page numbers to display.
   * 
   * For many pages, we show: 1 ... 4 5 6 ... 10
   * For few pages (≤5), we show all: 1 2 3 4 5
   * 
   * This prevents the pagination from getting too wide.
   */
  const getPageNumbers = (): (number | string)[] => {
    // If 5 or fewer pages, show all
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    // Always show first page
    pages.push(1);

    // Add "..." if current page is far from start
    if (currentPage > 3) {
      pages.push("...");
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add "..." if current page is far from end
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Page Circles with Arrows */}
      <div className="flex items-center gap-2">
        {/* Previous Arrow */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center
                     hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page Number Circles */}
        {getPageNumbers().map((page, index) =>
          typeof page === "string" ? (
            // Dots separator
            <span key={`dots-${index}`} className="px-1 text-gray-400 select-none">
              •••
            </span>
          ) : (
            // Page number circle
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                         transition-all duration-200
                         ${currentPage === page
                           ? "bg-black text-white shadow-md"  // Active page
                           : "border border-gray-300 text-gray-700 hover:bg-gray-100" // Inactive
                         }`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}

        {/* Next Arrow */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center
                     hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
