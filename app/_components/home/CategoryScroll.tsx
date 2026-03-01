"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const categories = [
  { name: "STREETWEAR", gradient: "from-orange-400 to-rose-500", image: "https://images.unsplash.com/photo-1523398267024-884399d88589?w=400&q=80" },
  { name: "WOMEN'S EDIT", gradient: "from-pink-400 to-fuchsia-600", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80" },
  { name: "MEN'S DROPS", gradient: "from-blue-500 to-indigo-700", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80" },
  { name: "UNISEX FITS", gradient: "from-slate-700 to-slate-900", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80" },
  { name: "OVERSIZED", gradient: "from-indigo-500 to-purple-600", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80" },
  { name: "ACCESSORIES", gradient: "from-emerald-400 to-cyan-500", image: "https://images.unsplash.com/photo-1576033158516-1aa89f0da34d?w=400&q=80" },
  { name: "Y2K VIBES", gradient: "from-pink-500 to-yellow-500", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80" },
  { name: "ATHLEISURE", gradient: "from-teal-400 to-blue-500", image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400&q=80" },
  { name: "CO-ORDS", gradient: "from-violet-500 to-purple-800", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80" },
  { name: "DENIM", gradient: "from-blue-600 to-indigo-800", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80" },
];

export default function CategoryScroll() {
  return (
    <section className="w-full py-8 overflow-hidden bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl font-black italic tracking-tighter uppercase sm:text-3xl">
          Shop by <span className="text-primary underline decoration-primary/30 underline-offset-8">Vibe</span>
        </h2>
        
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 pb-4">
            {categories.map((cat, i) => (
              <CarouselItem key={i} className="pl-4 basis-auto">
                <Link 
                  href={`/category/${cat.name.toLowerCase()}`}
                  className="group relative flex h-40 w-40 overflow-hidden rounded-2xl bg-slate-100 transition-all hover:scale-[0.98] sm:h-52 sm:w-52 shadow-xl shadow-slate-200/50 dark:shadow-none"
                >
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br transition-opacity duration-300 group-hover:opacity-90",
                    cat.gradient
                  )} />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-lg font-black italic leading-tight text-white drop-shadow-md sm:text-xl">
                      {cat.name}
                    </span>
                    <div className="mt-2 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-12" />
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 h-24 w-24 opacity-10 blur-sm transition-transform duration-500 group-hover:scale-125 group-hover:opacity-30">
                    <img src={cat.image} alt="" className="h-full w-full object-cover rounded-full" />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
