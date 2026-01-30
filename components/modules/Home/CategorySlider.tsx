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
import Image from "next/image";
import { useRef } from "react";

export function CategorySlider({
  categories,
}: {
  categories: any[] | undefined;
}) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  // Fallback images for categories
  const getCategoryImage = (categoryName: string) => {
    const images: { [key: string]: string } = {
      pizza:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
      burger:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
      sushi:
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=400&fit=crop",
      pasta:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
      salad:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop",
      dessert:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop",
      drinks:
        "https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&h=400&fit=crop",
      chicken:
        "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop",
      seafood:
        "https://images.unsplash.com/photo-1559737558-2f5a2f9f0f8b?w=400&h=400&fit=crop",
      vegetarian:
        "https://images.unsplash.com/photo-1540914124281-342587941389?w=400&h=400&fit=crop",
    };

    const name = categoryName?.toLowerCase() || "";
    return (
      images[name] ||
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop"
    );
  };

  return (
    <div className="relative py-16 px-4 md:px-16 bg-linear-to-b from-background via-secondary/20 to-background">
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Popular Categories
        </h2>
        <p className="text-muted-foreground">
          Explore our diverse food selection
        </p>
      </div>

      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        className="w-full max-w-7xl mx-auto"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {categories?.map((category, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <div className="group cursor-pointer">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 py-0">
                  <CardContent className="p-0 relative aspect-square">
                    {/* Image Container */}
                    <div className="relative w-full h-full">
                      <Image
                        src={
                          category?.image || getCategoryImage(category?.name)
                        }
                        alt={category?.name || "Category"}
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        width={400}
                        height={400}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300" />

                      {/* Category Name */}
                      <div className="absolute inset-0 flex items-end justify-center p-4">
                        <span className="text-white font-bold text-base md:text-lg text-center drop-shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:text-red-600">
                          {category?.name}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-4 md:-left-12 h-10 w-10 md:h-12 md:w-12 shadow-lg border-2 hover:scale-110 transition-transform cursor-pointer" />
        <CarouselNext className="-right-4 md:-right-12 h-10 w-10 md:h-12 md:w-12 shadow-lg border-2 hover:scale-110 transition-transform cursor-pointer" />
      </Carousel>
    </div>
  );
}
