"use client";

import { Loader2, LogIn, User } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllMockUsers, mockLogin } from "@/lib/api/mock/users";
import type { MockUser } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDemoUsers, setShowDemoUsers] = useState(false);
  const demoUsers = getAllMockUsers();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await mockLogin(email);

      if (user) {
        console.log("✅ Login successful, redirecting...");

        // Role-based redirect
        if (user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/client-portal");
        }
      } else {
        setError("No account found with that email address.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setError("");
    setIsLoading(true);

    try {
      const user = await mockLogin(demoEmail);

      if (user) {
        console.log("✅ Demo login successful, redirecting...");

        // Role-based redirect
        if (user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/client-portal");
        }
      } else {
        setError("Demo login failed.");
      }
    } catch (err) {
      console.error("Demo login error:", err);
      setError("An error occurred during demo login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Client Portal</h1>
          <p className="text-gray-600">Sign in to view your invoices</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Enter your email address to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="client@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-periwinkle hover:bg-periwinkle/90 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Demo Mode</span>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDemoUsers(!showDemoUsers)}
                  className="w-full"
                >
                  <User className="mr-2 h-4 w-4" />
                  {showDemoUsers ? "Hide" : "Show"} Demo Accounts
                </Button>

                {showDemoUsers && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 space-y-2"
                  >
                    {demoUsers.map((user: MockUser) => (
                      <button
                        key={user.id}
                        onClick={() => handleDemoLogin(user.email)}
                        disabled={isLoading}
                        className="w-full text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-periwinkle transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">
                              {user.full_name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                          <LogIn className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-xs text-blue-800">
                  💡 <strong>Demo Mode:</strong> This is a mock authentication
                  system for UI testing. No real authentication is happening.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-periwinkle"
          >
            &larr; Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
