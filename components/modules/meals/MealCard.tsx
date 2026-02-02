"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { MealCardProps } from "@/types/meal.type";
import { Clock, Eye, Flame, ShoppingCart, Utensils } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function MealCard({ meal }: MealCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      image: meal.image,
      isAvailable: meal.isAvailable,
      providerId: meal.providerId,
    });
    toast.success(`${meal.name} added to cart!`);
  };

  return (
    <Card className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 py-0">
      <CardHeader className="p-0 relative">
        <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-primary/20 to-primary/5">
          {meal.image ? (
            <div className="flex items-center justify-center h-full">
              <Utensils className="h-16 w-16 text-muted-foreground/30" />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Utensils className="h-16 w-16 text-muted-foreground/30" />
            </div>
          )}

          <div className="absolute top-2 right-2 flex gap-2">
            {meal.cuisine && meal.cuisine.length > 0 && (
              <Badge className="bg-primary/90 backdrop-blur">
                {meal.cuisine[0]}
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
          {meal.dietary?.slice(0, 2).map((diet) => (
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

      <CardFooter className="p-4 pt-0 flex flex-col gap-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">৳</span>
            <span className="text-2xl font-bold">{meal.price}</span>
          </div>
          <Button
            size="sm"
            disabled={!meal.isAvailable}
            onClick={handleAddToCart}
            className="group-hover:bg-primary cursor-pointer group-hover:text-primary-foreground transition-all"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
        <Link href={`/meals/${meal.id}`} className="w-full">
          <Button
            variant="outline"
            size="sm"
            className="w-full cursor-pointer border-primary/50 hover:bg-primary/10"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
