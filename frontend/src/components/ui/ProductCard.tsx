import Image from "next/image";
import Link from "next/link";

/**
 * ProductCard Component
 * 
 * This displays a single product in a card format.
 * 
 * Now using Next.js Image component with real Unsplash URLs.
 * 
 * Why next/image over <img>?
 * - Auto-optimizes images (converts to WebP/AVIF)
 * - Lazy loads (only loads when visible on screen)
 * - Prevents layout shift (reserves space before loading)
 * - Responsive (serves right size for device)
 * 
 * Later when you switch to Cloudinary or Django backend:
 * 1. Add the domain to next.config.ts remotePatterns
 * 2. Update the image URL - that's it!
 */

// Define the shape of props this component accepts
interface ProductCardProps {
  id: number;           // Unique identifier for the product
  name: string;         // Product name
  price: number;        // Price in dollars
  seller: string;       // Seller/brand name
  image: string;        // Image URL (Unsplash now, Cloudinary/Django later)
}

export default function ProductCard({ id, name, price, seller, image }: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Product Image Container */}
      <div className="relative h-44 bg-zinc-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-6"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        {/* Price and Name */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-lg font-bold">${price.toFixed(2)}</span>
          <span className="text-sm text-gray-800">{name}</span>
        </div>
        
        {/* Seller info */}
        <p className="text-xs text-gray-500 mb-3">by {seller}</p>
        
        {/* View Details Button - centered */}
        <div className="text-center">
          <Link
            href={`/product/${id}`}
            className="inline-flex items-center justify-center border-2 border-black px-6 py-2 text-sm font-medium rounded-md hover:bg-black hover:text-white transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
