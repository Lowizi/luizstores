import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

/**
 * Footer Component
 * 
 * This is a server component (no "use client" directive).
 * Server components are the default in Next.js App Router.
 * 
 * Benefits of server components:
 * - Faster initial page load (HTML is generated on server)
 * - Better SEO (search engines can read the content)
 * - Smaller JavaScript bundle (less code sent to browser)
 * 
 * We're using lucide-react for icons - a popular, tree-shakeable icon library.
 * Tree-shakeable means only the icons you import get included in the bundle.
 */

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-black to-zinc-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center flex flex-col items-center">
          {/* Brand name */}
          <h2 className="text-2xl font-bold italic mb-4">LuizStores</h2>
          
          {/* Description */}
          <p className="text-gray-300 text-sm max-w-md mx-auto mb-7 leading-6">
            LuizStores is your one-stop online marketplace for buying and selling 
            a wide range of products. Join our community today!
          </p>
          
          {/* Social Media Links */}
          <div className="flex items-center justify-center gap-6">
            {/* Each social link opens in new tab (target="_blank") */}
            {/* rel="noopener noreferrer" is a security measure to prevent
                the new page from accessing our window object */}
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
