"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Decorative blobs */}
      <div className="absolute left-[-10%] top-[-10%] z-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
      <div className="absolute right-[-5%] bottom-[-5%] z-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px] animate-pulse delay-700" />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-primary">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-bold tracking-wide italic uppercase">New Arrival: The Horizon Collection</span>
        </div>
        
        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl italic">
          Elevate Your <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/40 bg-clip-text text-transparent">Shopping</span> Experience
        </h1>
        
        <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-600 dark:text-slate-400 sm:text-xl">
          Discover a world of curated style and quality. From tech to fashion, we bring the best products directly to your doorstep.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.05] active:scale-[0.95]" asChild>
            <Link href="/products" className="flex items-center gap-2">
              Shop Now <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-900" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>

        {/* Stats placeholder */}
        <div className="mt-20 grid grid-cols-2 gap-8 divide-x border-t border-slate-200/50 pt-12 dark:border-slate-800/50 sm:grid-cols-4 sm:divide-x-0 lg:mt-32">
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold italic">50k+</span>
            <span className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Customers</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold italic">100k+</span>
            <span className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Products</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold italic">4.9/5</span>
            <span className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Rating</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold italic">24/7</span>
            <span className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
