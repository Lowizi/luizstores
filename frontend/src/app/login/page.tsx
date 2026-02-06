"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/ui/Footer";

/**
 * Login Page
 * 
 * Key concepts explained:
 * 
 * 1. "use client" Directive:
 *    - This page needs to be a Client Component because we use:
 *      - useState for form state management
 *      - Event handlers (onChange, onSubmit)
 *    - Client components run in the browser and can be interactive
 * 
 * 2. useState Hook:
 *    - React's way to add "memory" to components
 *    - When state changes, the component re-renders
 *    - Syntax: const [value, setValue] = useState(initialValue)
 * 
 * 3. Form Handling:
 *    - We use controlled inputs (value tied to state)
 *    - onChange updates state as user types
 *    - onSubmit handles form submission
 * 
 * 4. TypeScript:
 *    - We define types for our form data
 *    - Provides autocomplete and catches errors
 * 
 * Security Notes (for when we connect to backend):
 * - Passwords will be sent over HTTPS only
 * - Never log passwords
 * - Use httpOnly cookies for JWT tokens (prevents XSS)
 */

// Type definition for form data
interface LoginFormData {
  email: string;
  password: string;
}

// Separate component that uses useSearchParams (must be wrapped in Suspense)
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  // State for form fields
  // Each field is controlled by React state
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  // State for loading (when submitting)
  const [isLoading, setIsLoading] = useState(false);

  // State for error messages
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle input changes
   * 
   * This function updates the form state when user types.
   * We use a single handler for all inputs using the input's name attribute.
   * 
   * e.target.name = which input changed (email or password)
   * e.target.value = the new value
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,      // Keep other fields unchanged
      [name]: value // Update only the changed field
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  /**
   * Handle form submission
   * 
   * This will eventually connect to our Django backend.
   * For now, we just log the data and show loading state.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default form behavior (page reload)
    e.preventDefault();
    
    // Set loading state
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Connect to Django backend
      // This is where we'll call our /api/auth/login endpoint
      console.log("Login attempt with:", { email: formData.email });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set auth cookie (in production, this comes from Django backend via httpOnly cookie)
      // For now, we set it client-side for demo purposes
      document.cookie = "auth_token=demo_token; path=/; max-age=86400";
      
      // Redirect to dashboard or the page they were trying to access
      router.push(redirectTo);

    } catch (err) {
      // Handle errors
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Same style as landing page */}
      <header className="w-full text-white bg-linear-to-b from-black to-zinc-900 py-5">
        <div className="max-w-7xl mx-auto px-4 relative flex items-center justify-center">
          <Link
            href="/"
            aria-label="Go back"
            className="absolute left-4 inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>

          <Link href="/" className="text-3xl font-bold italic">
            LuizStores
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Single card like Figma (thin border around the whole content) */}
          <div className="bg-white border-2 border-black rounded-lg px-10 py-12">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Login</h1>
              <p className="text-gray-600">Access your account.</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full h-11 px-4 border border-gray-300 rounded-md text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-gray-400"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2.5">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                minLength={8}
                className="w-full h-11 px-4 border border-gray-300 rounded-md text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-gray-400"
              />

              {/* Forgot Password Link (under password, right aligned like Figma) */}
                <div className="text-right mt-4">
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black border-2 border-black py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-black font-medium underline hover:no-underline">
                Sign Up
              </Link>
            </p>
          </div>

        </div>
      </main>

      {/* Footer Component (same as home page) */}
      <Footer />
    </div>
  );
}

// Main page component with Suspense wrapper for useSearchParams
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
