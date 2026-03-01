"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    category: {
      name: string;
    } | null;
    images: {
      url: string;
    }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images[0]?.url || "/placeholder.png";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col space-y-3 rounded-2xl bg-white p-3 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 dark:bg-slate-900"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 flex items-end justify-center bg-black/5 opacity-0 transition-opacity group-hover:opacity-100 p-4">
          <Button
            size="sm"
            className="w-full shadow-lg gap-2 font-bold uppercase tracking-tighter italic"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col space-y-1 px-1 flex-1">
        <div className="flex items-center justify-between">
          {product.category && (
            <Badge
              variant="secondary"
              className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 dark:bg-slate-800"
            >
              {product.category.name}
            </Badge>
          )}
          <span className="text-lg font-black italic tracking-tighter text-primary">
            ${product.price.toLocaleString()}
          </span>
        </div>

        <h3 className="line-clamp-1 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">
          {product.name}
        </h3>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3 rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-900 animate-pulse">
      <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800" />
      <div className="space-y-2 px-1">
        <div className="flex justify-between">
          <div className="h-4 w-16 bg-slate-100 dark:bg-slate-800 rounded" />
          <div className="h-4 w-12 bg-slate-100 dark:bg-slate-800 rounded" />
        </div>
        <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded" />
      </div>
    </div>
  );
}
