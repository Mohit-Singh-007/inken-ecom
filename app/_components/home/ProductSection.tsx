"use client";

import { ShoppingCart, Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const products = [
  { id: 1, name: "Oversized 'NEON' Hoodie", price: 69.00, tag: "TRENDING", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80", rating: 4.9 },
  { id: 2, name: "Vintage Cargo Pants", price: 85.00, tag: "NEW", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80", rating: 4.8 },
  { id: 3, name: "Cyber Baggy Tee", price: 45.00, tag: "POPULAR", image: "https://images.unsplash.com/photo-1523398267024-884399d88589?w=400&q=80", rating: 4.7 },
  { id: 4, name: "Retro Sneakers V2", price: 120.00, tag: "LIMITED", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", rating: 5.0 },
];

interface ProductSectionProps {
  title: string;
  subtitle?: string;
}

export default function ProductSection({ title, subtitle }: ProductSectionProps) {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/30">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-black italic tracking-tighter uppercase sm:text-5xl">
              {title}
            </h2>
            {subtitle && <p className="mt-2 text-slate-500 font-medium">{subtitle}</p>}
          </div>
          <Button variant="link" className="font-bold text-primary italic">VIEW ALL</Button>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-white shadow-lg transition-transform duration-500 hover:-translate-y-2 dark:bg-slate-800">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Icons */}
                <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-colors hover:bg-primary hover:text-white dark:bg-slate-900/90">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Tag */}
                <Badge className="absolute left-4 top-4 bg-primary px-3 py-1 text-[10px] font-black italic tracking-widest text-primary-foreground shadow-lg shadow-primary/20">
                  {product.tag}
                </Badge>

                {/* Quick Add Button */}
                <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Button className="w-full h-12 font-black italic shadow-xl shadow-primary/30">
                    <ShoppingCart className="mr-2 h-5 w-5" /> ADD TO BAG
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div className="mt-6 px-2">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold">{product.rating}</span>
                </div>
                <h3 className="text-xl font-bold italic tracking-tight text-slate-900 dark:text-slate-100">
                  {product.name}
                </h3>
                <p className="mt-1 text-2xl font-black text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
