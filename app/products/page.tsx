import { getCategories } from "@/lib/dal/category";

import { ProductFilters } from "../_components/storefront/ProductFilters";
import {
  ProductList,
  ProductListSkeleton,
} from "../_components/storefront/ProductList";
import { Suspense } from "react";
import { ProductQueryPayload } from "@/lib/dal/product";
import Navbar from "../_components/layout/Navbar";

interface ProductsPageProps {
  searchParams: Promise<ProductQueryPayload>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-slate-50/30 dark:bg-slate-950">
      <Navbar />

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-5xl font-black italic tracking-tighter uppercase sm:text-6xl">
            The{" "}
            <span className="text-primary underline decoration-primary/20 underline-offset-8">
              Collection
            </span>
          </h1>
          <p className="text-slate-500 font-medium italic">
            High-performance gear curated for the modern minimalist.
          </p>
        </div>

        {/* Filters Row - Loads immediately */}
        <ProductFilters categories={categories} />

        {/* Grid - Streams in */}
        <Suspense
          key={JSON.stringify(params)}
          fallback={<ProductListSkeleton />}
        >
          <ProductList params={params} />
        </Suspense>
      </div>
    </main>
  );
}
