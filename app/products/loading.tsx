import { ProductCardSkeleton } from "../_components/storefront/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50/30 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-12 space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-2">
            <Skeleton className="h-12 w-64 rounded-xl" />
            <Skeleton className="h-4 w-96 rounded-lg" />
        </div>

        {/* Filters Placeholder */}
        <div className="h-20 w-full rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 animate-pulse" />

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
