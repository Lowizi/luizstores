"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Email Verification Page
 * 
 * After signup, users are redirected here to enter a 6-digit code
 * sent to their email address.
 * 
 * Key concepts:
 * - 6 separate input boxes for each digit
 * - Auto-focus moves to next box on input
 * - Backspace moves to previous box
 * - Resend code functionality
 */

export default function VerifyEmailPage() {
  const router = useRouter();
  
  // Store each digit in an array
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs for each input to control focus
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  /**
   * Handle digit input
   * - Only allow single digits
   * - Auto-advance to next input
   */
  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Clear error when typing
    if (error) setError(null);
  };

  /**
   * Handle backspace
   * - Move to previous input when current is empty
   */
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /**
   * Handle paste
   * - Allow pasting full 6-digit code
   */
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newCode = pastedData.split("").concat(Array(6 - pastedData.length).fill(""));
      setCode(newCode.slice(0, 6));
      // Focus last filled input or last input
      const lastIndex = Math.min(pastedData.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  /**
   * Verify the code
   */
  const handleVerify = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Connect to Django backend
      // POST /api/auth/verify-email
      // Body: { code: fullCode }
      console.log("Verifying code:", fullCode);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear pending verification cookie
      document.cookie = "pending_verification=; path=/; max-age=0";
      
      // Set auth token (in production, this comes from Django backend)
      document.cookie = "auth_token=verified_token; path=/; max-age=86400";
      
      // Redirect to dashboard
      router.push("/dashboard");

    } catch (err) {
      setError("Invalid code. Please try again.");
      console.error("Verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resend verification code
   */
  const handleResend = async () => {
    // TODO: Connect to Django backend
    // POST /api/auth/resend-verification
    console.log("Resending code...");
    alert("New code sent to your email!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Card - with more vertical space */}
          <div className="bg-white border-2 border-black rounded-xl overflow-hidden">
            {/* Card Content */}
            <div className="px-12 pt-12 pb-10 text-center">
              {/* Logo */}
              <Link href="/" className="text-2xl font-bold italic">
                LuizStores
              </Link>

              {/* Title */}
              <h1 className="text-2xl font-bold mt-10 mb-3">Email Confirmation</h1>
              <p className="text-gray-600 text-sm mb-3">
                Please enter the 6-digit code we sent to:
              </p>
              <p className="font-semibold text-lg mb-10">john.doe@example.com</p>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* 6-Digit Code Input */}
              <div className="flex justify-center gap-3 mb-10" onPaste={handlePaste}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                ))}
              </div>

              {/* Resend Link */}
              <p className="text-sm text-gray-600">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-black font-medium underline hover:no-underline"
                >
                  Resend Code
                </button>
              </p>
            </div>

            {/* Verify Button - full width at bottom with rounded corners */}
            <button
              type="button"
              onClick={handleVerify}
              disabled={isLoading}
              className="w-full bg-black text-white py-4 font-semibold text-lg hover:bg-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-10">
            © 2024 LuizStores. Privacy Policy | Terms of Service
          </p>
        </div>
      </main>
    </div>
  );
}
