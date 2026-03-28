import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <section className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-surface-100 mb-4">Page Not Found</h2>
        <p className="text-surface-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-6 py-3 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 focus-ring"
        >
          <FaHome />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
