"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaLock } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
// We will use standard tailwind classes or shadcn components if they are ready,
// but to be safe for this initial setup, we use standard inputs and classes.

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParams = searchParams?.get("redirect");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(redirectParams || "/dashboard");
        router.refresh();
      } else {
        setError("Invalid password. Nice try though.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-900 justify-center items-center px-4 relative overflow-hidden">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-surface-400 hover:text-white transition-colors">
          <HiArrowLeft />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      <div className="glass rounded-xl p-8 w-full max-w-md shadow-xl border border-surface-700/50 relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center border border-brand-500/20 shadow-glow">
            <FaLock className="text-2xl text-brand-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-white mb-2">Admin Access</h1>
        <p className="text-surface-400 text-center text-sm mb-8">
          Enter the secret key to access the portfolio dashboard.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface-800 border border-surface-600/50 rounded-lg text-white placeholder-surface-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-mono"
              required
            />
          </div>

          {error && <p className="text-error text-sm text-center bg-error/10 py-2 rounded-lg border border-error/20">{error}</p>}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-brand-500 hover:bg-brand-600 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Authenticating..." : "Unlock Dashboard"}
          </button>
        </form>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-700/10 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
