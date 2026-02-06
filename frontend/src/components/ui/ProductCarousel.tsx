"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ProductCarousel
 * 
 * This is the "row slider" you described with the arrows.
 * - Horizontal scroll row
 * - Left/right arrow buttons
 * - Shows a visible scrollbar (styled via .ls-carousel in globals.css)
 * 
 * Why this is useful:
 * - When you have many products, the row can scroll without breaking the layout
 * - Later, the product list will come from Django API
 */

type Product = {
  id: number;
  name: string;
  price: number;
  seller: string;
  image: string;
};

export default function ProductCarousel({
  products,
  renderItem,
  ariaLabel,
}: {
  products: Product[];
  renderItem: (product: Product) => React.ReactNode;
  ariaLabel: string;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollAmount = useMemo(() => {
    // Roughly one card width + gap; responsive enough for our layout.
    return 340;
  }, []);

  const updateScrollButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    // Allow small rounding tolerance
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  useEffect(() => {
    updateScrollButtons();

    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => updateScrollButtons();
    const onResize = () => updateScrollButtons();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [products.length]);

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        type="button"
        onClick={() => scrollBy("left")}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-gray-200 bg-white/80 backdrop-blur
                   flex items-center justify-center shadow-sm hover:bg-white transition disabled:opacity-0 disabled:pointer-events-none"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => scrollBy("right")}
        disabled={!canScrollRight}
        aria-label="Scroll right"
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-gray-200 bg-white/80 backdrop-blur
                   flex items-center justify-center shadow-sm hover:bg-white transition disabled:opacity-0 disabled:pointer-events-none"
      >
        <ChevronRight size={20} />
      </button>

      {/* Scrollable row */}
      <div
        ref={scrollerRef}
        aria-label={ariaLabel}
        className="ls-carousel scroll-smooth"
      >
        <div className="flex gap-6 min-w-max px-1">
          {products.map((p) => (
            <div
              key={p.id}
              className="w-70 sm:w-75 lg:w-[320px] flex-none"
            >
              {renderItem(p)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
