"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Flame, Leaf, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  calories: number;
  cuisine?: string;
  dietary?: string[];
  spiceLevel?: string;
  isAvailable: boolean;
  category?: {
    name: string;
  };
}

interface PopularMealsProps {
  meals: Meal[];
}

export function PopularMeals({ meals }: PopularMealsProps) {
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const router = useRouter();

  const handleAddToCart = async (mealId: string) => {
    setAddingToCart(mealId);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: Implement actual cart logic
    console.log("Added to cart:", mealId);

    setAddingToCart(null);
  };

  const getSpiceLevelColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case "mild":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "medium":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "hot":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <section className=" px-4 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Popular Meals</h2>
          <p className="text-muted-foreground text-lg">
            Discover our most loved dishes
          </p>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals?.slice(0, 6).map((meal) => (
            <Card
              key={meal.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col py-0"
            >
              {/* Image Container */}
              <Link
                href={`/meals/${meal.id}`}
                className="block relative aspect-4/3 overflow-hidden"
              >
                <Image
                  src={
                    meal.image ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop"
                  }
                  alt={meal.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Availability Badge */}
                {!meal.isAvailable && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      Unavailable
                    </Badge>
                  </div>
                )}

                {/* Category Badge */}
                {meal.category && (
                  <Badge className="absolute top-3 left-3 bg-primary/90 hover:bg-primary">
                    {meal.category.name}
                  </Badge>
                )}
              </Link>

              <CardContent className="flex-1 p-5 space-y-3">
                {/* Title */}
                <Link href={`/meals/${meal.id}`}>
                  <h3 className="font-bold text-xl group-hover:text-red-600 transition-colors line-clamp-1">
                    {meal.name}
                  </h3>
                </Link>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {meal.description ||
                    "Delicious meal prepared with fresh ingredients"}
                </p>

                {/* Meal Details */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {meal.calories && (
                    <Badge variant="outline" className="text-xs">
                      <Flame className="w-3 h-3 mr-1" />
                      {meal.calories} cal
                    </Badge>
                  )}

                  {meal.dietary && meal.dietary.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      <Leaf className="w-3 h-3 mr-1" />
                      {meal.dietary[0]}
                    </Badge>
                  )}

                  {meal.spiceLevel && (
                    <Badge
                      variant="outline"
                      className={`text-xs ${getSpiceLevelColor(meal.spiceLevel)}`}
                    >
                      {meal.spiceLevel}
                    </Badge>
                  )}
                </div>

                {/* Cuisine */}
                {meal.cuisine && (
                  <p className="text-xs text-muted-foreground italic">
                    {meal.cuisine} Cuisine
                  </p>
                )}
              </CardContent>

              <CardFooter className="p-5 pt-0 flex items-center justify-between gap-3">
                {/* Price */}
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-primary">
                    ${meal.price.toFixed(2)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hover:bg-primary hover:text-white-foreground transition-colors cursor-pointer"
                  >
                    <Link href={`/meals/${meal.id}`}>Details</Link>
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(meal.id)}
                    disabled={!meal.isAvailable || addingToCart === meal.id}
                    className="gap-2 hover:bg-red-600 hover:border-red-600 transition-colors cursor-pointer hover:text-white"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {addingToCart === meal.id ? "Adding..." : "Add"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 mb-12 text-center">
          <Button size="lg" variant="destructive" asChild className="gap-2">
            <Link href="/meals">
              View All Meals
              <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
