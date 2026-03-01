import { getProducts, ProductQueryPayload } from "@/lib/dal/product";
import { ProductGrid } from "./ProductGrid";
import { ProductCardSkeleton } from "./ProductCard";

interface ProductListProps {
    params: ProductQueryPayload;
}

export async function ProductList({ params }: ProductListProps) {
    const { products, pagination } = await getProducts(params);

    return (
        <div className="space-y-12">
            {/* Counter */}
            <div className="flex items-center justify-between px-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    Showing <span className="text-primary">{products.length}</span> of {pagination.totalCount} Products
                </p>
            </div>

            <ProductGrid products={products} />

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className="flex justify-center pt-12 pb-24">
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                         <span className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                            Page {pagination.currentPage} of {pagination.totalPages}
                         </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export function ProductListSkeleton() {
    return (
        <div className="space-y-12">
            <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
        </div>
    );
}
