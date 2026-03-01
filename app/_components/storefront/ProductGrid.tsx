import { ProductCard, ProductCardSkeleton } from "./ProductCard";

interface ProductGridProps {
    products: any[];
    isLoading?: boolean;
    columns?: number;
}

export function ProductGrid({ 
    products, 
    isLoading,
    columns = 4
}: ProductGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/50 p-12 text-center dark:border-slate-800 dark:bg-slate-900/50">
                <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 dark:bg-slate-800 shadow-xl">
                    <span className="text-4xl">🔎</span>
                </div>
                <h3 className="text-xl font-black italic tracking-tighter uppercase mb-2">No Products Found</h3>
                <p className="text-slate-500 max-w-xs text-sm font-medium">We couldn't find anything matching your filters. Try adjusting your search.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
