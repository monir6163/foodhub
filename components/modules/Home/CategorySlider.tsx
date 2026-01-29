"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export function CategorySlider() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  return (
    <div className="relative md:px-16 py-16 bg-secondary/60">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        className="w-full"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
      >
        <CarouselContent className="-ml-1">
          {Array.from({ length: 20 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/6 shrink-0 pl-1"
            >
              <div className="">
                <Card className="h-40 w-40 flex items-center justify-center border-dashed border-2 border-muted bg hover:border-foreground transition-colors mx-auto">
                  <CardContent className="flex h-full items-center justify-center p-2">
                    <span className="text-sm font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-3.5 cursor-pointer hidden md:block" />
        <CarouselNext className="-right-3.5 cursor-pointer hidden md:block" />
      </Carousel>
    </div>
  );
}
