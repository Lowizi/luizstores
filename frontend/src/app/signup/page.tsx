"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/ui/Footer";

/**
 * Sign Up Page
 * 
 * This page handles new user registration with role selection.
 * 
 * Key concepts explained:
 * 
 * 1. Role-Based Registration:
 *    - Users can register as either "buyer" or "seller"
 *    - This role will be stored in our Django backend
 *    - Different roles have different permissions
 * 
 * 2. Form Validation:
 *    - Client-side validation (required, minLength, type="email")
 *    - Server-side validation will happen in Django
 *    - Never trust client-side validation alone!
 * 
 * 3. Radio Button Groups:
 *    - All radios with same "name" form a group
 *    - Only one can be selected at a time
 *    - We use checked attribute to tie to state
 * 
 * Security Notes:
 * - Passwords should be at least 8 characters
 * - Backend will hash passwords (never store plain text)
 * - Email verification will be added later
 */

// Define the shape of our form data
interface SignUpFormData {
  email: string;
  password: string;
  role: "buyer" | "seller";  // Union type - can only be one of these
}

export default function SignUpPage() {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    role: "buyer", // Default role
  });

  // Loading state for submit button
  const [isLoading, setIsLoading] = useState(false);

  // Error message state
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle text input changes (email, password)
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  /**
   * Handle role selection (radio buttons)
   * 
   * Radio buttons work slightly differently - we check if it's selected
   * and update the role accordingly.
   */
  const handleRoleChange = (role: "buyer" | "seller") => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  /**
   * Handle form submission
   * 
   * This will connect to Django's /api/auth/register endpoint
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Connect to Django backend
      // POST /api/auth/register
      // Body: { email, password, role }
      console.log("Sign up attempt:", { 
        email: formData.email, 
        role: formData.role 
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to email verification page
      router.push("/verify-email");

    } catch (err) {
      setError("Sign up failed. Please try again.");
      console.error("Sign up error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
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

      {/* Sign Up Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Single card like Figma (thin border around the whole content) */}
          <div className="bg-white border-2 border-black rounded-lg px-10 py-12">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
              <p className="text-gray-600">Create your account.</p>
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

              {/* Forgot Password Link */}
                <div className="text-right mt-4">
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Sign up as
              </label>
              
              {/* Buyer Option */}
              <div className="space-y-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    checked={formData.role === "buyer"}
                    onChange={() => handleRoleChange("buyer")}
                    className="mt-1 w-4 h-4 accent-black border-gray-300 focus:ring-black"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Buyer</span>
                    <p className="text-sm text-gray-500">Browse and purchase items.</p>
                  </div>
                </label>

                {/* Seller Option */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    checked={formData.role === "seller"}
                    onChange={() => handleRoleChange("seller")}
                    className="mt-1 w-4 h-4 accent-black border-gray-300 focus:ring-black"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Seller</span>
                    <p className="text-sm text-gray-500">List and sell your products.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black border-2 border-black py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </button>
            </form>
            {/* Login Link */}
            <p className="mt-8 text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-black font-medium underline hover:no-underline">
                Login
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
