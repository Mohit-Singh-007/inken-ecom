"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { type CarouselApi } from "@/components/ui/carousel";

const slides = [
  {
    title: "DROP ZERO",
    subtitle: "STREETWEAR COLLECTION 2026",
    color: "bg-slate-900 text-white",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1200&q=80",
    cta: "SHOP THE DROP"
  },
  {
    title: "VIBE CHECK",
    subtitle: "UP TO 50% OFF SUMMER ESSENTIALS",
    color: "bg-primary text-white",
    image: "https://images.unsplash.com/photo-1523398267024-884399d88589?w=1200&q=80",
    cta: "GRAB THE DEAL"
  },
  {
    title: "CYBER PUNK",
    subtitle: "TECHWEAR & NEON FUTURISM",
    color: "bg-indigo-950 text-indigo-400",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1200&q=80",
    cta: "ENTER THE FUTURE"
  },
  {
    title: "VINTAGE SOUL",
    subtitle: "THRIFTED VIBES & RETRO CLASSICS",
    color: "bg-amber-900 text-amber-200",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    cta: "SHOP VINTAGE"
  },
  {
    title: "DENIM DAZE",
    subtitle: "RAW SELVEDGE & RELAXED FITS",
    color: "bg-blue-900 text-blue-100",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80",
    cta: "EXPLORE DENIM"
  }
];

export default function MainSlider() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="relative w-full overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, i) => (
            <CarouselItem key={i} className="pl-0">
              <div
                className={cn(
                  "relative flex h-[400px] w-full items-center sm:h-[500px] lg:h-[600px]",
                  slide.color
                )}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover opacity-50 grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>

                <div className="container relative mx-auto px-4 lg:px-12">
                  <div className="max-w-2xl">
                    <span className="mb-4 inline-block text-sm font-bold tracking-[0.3em] text-primary sm:text-base">
                      {slide.subtitle}
                    </span>
                    <h1 className="mb-8 text-6xl font-black italic tracking-tighter sm:text-8xl lg:text-9xl uppercase">
                      {slide.title}
                    </h1>
                    <Button
                      size="lg"
                      className="h-14 px-8 text-lg font-bold shadow-2xl shadow-primary/40 transition-all hover:scale-105 active:scale-95"
                    >
                      {slide.cta} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation (Gen Z Style) */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-4 sm:right-12 sm:bottom-12">
          <button
            onClick={() => api?.scrollPrev()}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Custom Indicators */}
        <div className="absolute left-8 bottom-8 z-20 flex gap-2 sm:left-12 sm:bottom-12">
          {slides.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 transition-all duration-300",
                i === current ? "w-12 bg-primary" : "w-4 bg-white/30"
              )}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
