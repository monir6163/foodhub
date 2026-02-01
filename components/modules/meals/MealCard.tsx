"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Clock, Flame, ShoppingCart, Utensils } from "lucide-react";
import Image from "next/image";

interface Meal {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  isAvailable: boolean;
  calories: number;
  ingredients: string[];
  cuisine: string;
  dietary: string[];
  mealType: string | null;
  spiceLevel: string | null;
}

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  return (
    <Card className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 py-0">
      <CardHeader className="p-0 relative">
        <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-primary/20 to-primary/5">
          {meal.image ? (
            <Image
              src={meal.image}
              alt={meal.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Utensils className="h-16 w-16 text-muted-foreground/30" />
            </div>
          )}

          <div className="absolute top-2 right-2 flex gap-2">
            {meal.cuisine && (
              <Badge className="bg-primary/90 backdrop-blur">
                {meal.cuisine}
              </Badge>
            )}
          </div>

          {!meal.isAvailable && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {meal.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {meal.description || "Delicious meal prepared with care"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {meal.dietary.slice(0, 2).map((diet) => (
            <Badge key={diet} variant="outline" className="text-xs capitalize">
              {diet}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {meal.mealType && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{meal.mealType}</span>
            </div>
          )}
          {meal.calories && (
            <div className="flex items-center gap-1">
              <Flame className="h-3 w-3" />
              <span>{meal.calories} cal</span>
            </div>
          )}
          {meal.spiceLevel && (
            <Badge variant="secondary" className="text-xs">
              {meal.spiceLevel} 🌶️
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">৳</span>
          <span className="text-2xl font-bold">{meal.price}</span>
        </div>
        <Button
          size="sm"
          disabled={!meal.isAvailable}
          className="group-hover:bg-primary group-hover:text-primary-foreground transition-all"
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
