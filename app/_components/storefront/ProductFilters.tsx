"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import {
  Filter,
  X,
  ChevronDown,
  ArrowUpNarrowWide,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
}

interface ProductFiltersProps {
  categories: Category[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentSort = searchParams.get("sortBy") || "newest";

  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      });

      return newSearchParams.toString();
    },
    [searchParams],
  );

  const handleCategoryChange = (slug: string | null) => {
    router.push(
      `/products?${createQueryString({ category: slug, page: "1" })}`,
    );
  };

  const handlePriceApply = () => {
    router.push(
      `/products?${createQueryString({
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
        page: "1",
      })}`,
    );
  };

  const handleSortChange = (value: string) => {
    router.push(`/products?${createQueryString({ sortBy: value, page: "1" })}`);
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    router.push("/products");
  };

  const hasFilters =
    currentCategory ||
    currentMinPrice ||
    currentMaxPrice ||
    currentSort !== "newest";

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 backdrop-blur-xl sticky top-20 z-40">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="h-10 rounded-xl gap-2 font-black uppercase italic tracking-tighter border-2 border-slate-100 hover:border-primary"
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasFilters && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white rounded-full text-[10px]">
                  !
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] rounded-r-3xl border-none p-8"
          >
            <SheetHeader className="text-left mb-8">
              <SheetTitle className="text-3xl font-black italic tracking-tighter uppercase">
                Refine <span className="text-primary">Search</span>
              </SheetTitle>
              <SheetDescription className="font-medium">
                Adjust your preferences to find the perfect gear.
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-10">
              {/* Categories */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={!currentCategory ? "default" : "outline"}
                    className="px-4 py-2 rounded-xl cursor-pointer font-bold uppercase tracking-widest text-[10px] transition-all"
                    onClick={() => handleCategoryChange(null)}
                  >
                    All Items
                  </Badge>
                  {categories.map((cat) => (
                    <Badge
                      key={cat.id}
                      variant={
                        currentCategory === cat.slug ? "default" : "outline"
                      }
                      className="px-4 py-2 rounded-xl cursor-pointer font-bold uppercase tracking-widest text-[10px] transition-all"
                      onClick={() => handleCategoryChange(cat.slug)}
                    >
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Price Range (Rs.)
                </h4>

                <div className="px-2 pt-4 pb-2">
                  <Slider
                    defaultValue={[0, 5000]}
                    max={10000}
                    step={50}
                    value={[
                      minPrice ? parseInt(minPrice) : 0,
                      maxPrice ? parseInt(maxPrice) : 10000,
                    ]}
                    onValueChange={(vals) => {
                      setMinPrice(vals[0].toString());
                      setMaxPrice(vals[1].toString());
                    }}
                    className="py-4"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">
                      Min
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="h-12 rounded-xl border-2 border-slate-100 font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">
                      Max
                    </label>
                    <Input
                      type="number"
                      placeholder="9999"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="h-12 rounded-xl border-2 border-slate-100 font-bold"
                    />
                  </div>
                </div>
                <Button
                  onClick={handlePriceApply}
                  className="w-full h-12 rounded-xl font-black uppercase italic tracking-tighter"
                >
                  Apply Price Range
                </Button>
              </div>

              {/* Active Filters Summary & Reset */}
              {hasFilters && (
                <div className="pt-6 border-t border-slate-100">
                  <Button
                    variant="ghost"
                    onClick={handleReset}
                    className="w-full h-12 rounded-xl gap-2 font-black uppercase italic tracking-tighter text-slate-400 hover:text-red-500 hover:bg-red-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset All Filters
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden sm:flex items-center gap-2">
          {currentCategory && (
            <Badge
              variant="secondary"
              className="h-10 px-4 rounded-xl gap-2 bg-slate-100 text-slate-600 border-none font-bold uppercase tracking-widest text-[10px]"
            >
              {categories.find((c) => c.slug === currentCategory)?.name}
              <X
                className="h-3 w-3 cursor-pointer hover:text-primary"
                onClick={() => handleCategoryChange(null)}
              />
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="flex items-center gap-2 text-slate-400 mr-2 md:block hidden">
          <ArrowUpNarrowWide className="h-4 w-4" />
        </div>
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full md:w-[180px] h-10 rounded-xl border-2 border-slate-100 font-black uppercase italic tracking-tighter text-sm">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-none shadow-2xl p-2">
            <SelectItem
              value="newest"
              className="font-bold uppercase tracking-tighter italic rounded-xl focus:bg-primary/10 accent-primary"
            >
              Newest Arrivals
            </SelectItem>
            <SelectItem
              value="price_asc"
              className="font-bold uppercase tracking-tighter italic rounded-xl focus:bg-primary/10 accent-primary"
            >
              Price: Low to High
            </SelectItem>
            <SelectItem
              value="price_desc"
              className="font-bold uppercase tracking-tighter italic rounded-xl focus:bg-primary/10 accent-primary"
            >
              Price: High to Low
            </SelectItem>
            <SelectItem
              value="featured"
              className="font-bold uppercase tracking-tighter italic rounded-xl focus:bg-primary/10 accent-primary"
            >
              Featured Items
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
