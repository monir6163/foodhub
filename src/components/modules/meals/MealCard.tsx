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
import { Clock, Eye, Flame, ShoppingCart, Star, Utensils } from "lucide-react";
import Image from "next/image";
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
            <Image
              src={meal.image}
              alt={meal.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Utensils className="h-16 w-16 text-muted-foreground/30" />
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <Link
            href={`/meals/${meal.id}`}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 text-black backdrop-blur-md flex items-center justify-center shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            aria-label={`View details for ${meal.name}`}
          >
            <Eye className="h-5 w-5" />
          </Link>

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
          {typeof meal.rating === "number" && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="font-medium">{meal.rating.toFixed(1)}</span>
            </div>
          )}
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
          onClick={handleAddToCart}
          className="rounded-lg px-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
