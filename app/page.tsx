
import { CategoryShowcase, CategoryShowcaseSkeleton } from "./_components/storefront/CategoryShowcase";
import { ProductGrid } from "./_components/storefront/ProductGrid";
import { getFeaturedProducts } from "@/lib/dal/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Suspense } from "react";
import Navbar from "./_components/layout/Navbar";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts(8);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-24 pb-32 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent opacity-40" />
        <div className="container relative mx-auto px-4 text-center space-y-10">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] animate-fade-in flex items-center gap-2 mx-auto w-fit">
                <Sparkles className="h-4 w-4" />
                New Collection 2026
            </Badge>
            
            <h1 className="text-6xl font-black italic tracking-tighter uppercase sm:text-8xl lg:text-9xl leading-[0.85] max-w-5xl mx-auto">
                Elevate Your <span className="text-primary italic underline underline-offset-[16px] decoration-primary/20">Lifestyle</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-xl text-slate-400 font-medium leading-relaxed">
                Experience the next generation of commerce. Premium products, unmatched quality, and effortless design for the modern era.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                <Button asChild size="lg" className="h-16 px-12 rounded-2xl text-xl font-black uppercase italic tracking-tighter shadow-2xl shadow-primary/30 group transition-all hover:scale-105 active:scale-95">
                    <Link href="/products">
                        Shop Collection
                        <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
        </div>
      </section>

      <div className="container mx-auto space-y-32 px-4 py-32">
        {/* Categories Section */}
        <div className="space-y-12">
            <div className="flex flex-col items-center text-center space-y-4">
                <h2 className="text-4xl font-black italic tracking-tighter uppercase sm:text-5xl">
                    The <span className="text-primary underline decoration-primary/30 underline-offset-8">Essentials</span>
                </h2>
                <p className="text-slate-500 font-medium max-w-md italic">Everything you need, nothing you don't. Pure minimalist efficiency.</p>
            </div>
            <Suspense fallback={<CategoryShowcaseSkeleton />}>
                <CategoryShowcase />
            </Suspense>
        </div>

        {/* Featured Products Section */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <h2 className="text-4xl font-black italic tracking-tighter uppercase sm:text-5xl">
                Featured <span className="text-primary underline decoration-primary/30 underline-offset-8">Drops</span>
              </h2>
              <p className="text-slate-500 font-medium max-w-md italic">Our hand-picked selection of top-tier gear chosen for maximum impact.</p>
            </div>
            <Button asChild variant="link" className="group p-0 h-auto text-primary font-black uppercase tracking-widest text-[10px] italic">
                <Link href="/products" className="flex items-center gap-2">
                    Explore All Products
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </Button>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </section>

        {/* Brand Mission Section */}
        <section className="relative overflow-hidden rounded-[4rem] bg-slate-900 px-8 py-24 text-white shadow-3xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
            <div className="relative mx-auto max-w-4xl text-center space-y-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary shadow-2xl shadow-primary/40 rotate-12 mb-4">
                    <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-5xl font-black italic tracking-tighter uppercase sm:text-6xl leading-[0.9]">
                    Beyond Just <span className="text-primary italic">A Brand</span>.
                </h2>
                <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl mx-auto italic">
                    We believe in quality over quantity. Every item in our store is carefully vetted to meet the highest standards of durability, ethics, and aesthetics.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 pt-10">
                    <div className="space-y-2">
                        <div className="text-3xl font-black text-primary italic leading-none">FREE</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Shipping On All Orders</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl font-black text-primary italic leading-none">24/7</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Elite Support Flow</div>
                    </div>
                    <div className="hidden lg:block space-y-2">
                        <div className="text-3xl font-black text-primary italic leading-none">FOREVER</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Quality Guarantee</div>
                    </div>
                </div>
            </div>
        </section>
      </div>

      <footer className="border-t border-slate-100 bg-white py-20 dark:border-slate-800 dark:bg-slate-950">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-slate-50 pb-20 mb-10 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/20">
                        <span className="text-2xl font-black text-primary-foreground italic">E</span>
                    </div>
                    <span className="text-3xl font-black uppercase tracking-tighter italic">Ecom</span>
                </div>
                <div className="flex flex-wrap justify-center gap-10">
                    {["Shop", "Collections", "About", "Sustainability"].map((link) => (
                        <Link key={link} href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors">
                            {link}
                        </Link>
                    ))}
                </div>
            </div>
          <p className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 dark:text-slate-700">
            Ecom WorldWide © 2026 - No Cap Architecture.
          </p>
        </div>
      </footer>
    </main>
  );
}
