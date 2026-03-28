"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <section className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-semibold text-surface-100 mb-4">Something went wrong</h2>
        <p className="text-surface-400 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 focus-ring"
        >
          Try Again
        </button>
      </div>
    </section>
  );
}
