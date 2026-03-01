import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/dal/category";
import { ChevronRight, Layers } from "lucide-react";

export async function CategoryShowcase() {
  const categories = await getCategories();

  if (categories.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black italic tracking-tighter uppercase">
          Explore <span className="text-primary underline decoration-primary/30 underline-offset-8">Categories</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className="group relative flex flex-col aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-100 transition-all hover:shadow-2xl hover:-translate-y-2 dark:bg-slate-900"
          >
            {category.image ? (
                <Image 
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                />
            ) : (
                <div className="flex flex-1 items-center justify-center bg-primary/5 text-primary">
                    <Layers className="h-12 w-12 opacity-20" />
                </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic">Collection</span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                {category.name}
                </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CategoryShowcaseSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-8 w-48 bg-slate-100 dark:bg-slate-800 rounded-lg" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-32 rounded-2xl bg-slate-100 dark:bg-slate-800" />
                ))}
            </div>
        </div>
    );
}
