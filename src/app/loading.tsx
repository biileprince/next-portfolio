export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-surface-700" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-brand-400 border-t-transparent animate-spin" />
        </div>
        <p className="text-surface-400 text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
