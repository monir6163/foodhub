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
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  Eye,
  Flame,
  ShoppingCart,
  Star,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  providerId?: string;
  rating?: number;
  prepTime?: number;
  calories?: number;
  category?: {
    name: string;
  };
  isAvailable?: boolean;
}

interface ProviderMealsGridProps {
  meals: Meal[];
}

export function PopularMeals({ meals }: ProviderMealsGridProps) {
  const addItem = useCartStore((state) => state.addItem);

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  const handleAddToCart = (meal: Meal) => {
    addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      image: meal.image || null,
      isAvailable: meal.isAvailable ?? true,
      providerId: meal.providerId,
    });
    toast.success(`${meal.name} added to cart!`);
  };

  if (!meals || meals.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">No Meals Available</h3>
          <p className="text-muted-foreground">
            This provider hasn't added any meals yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <motion.div
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        variants={fadeUp}
        transition={{ duration: 0.26, ease: "easeOut" }}
      >
        <div className="space-y-2">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">
            Curated Picks
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Popular Meals
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Browse through {meals.length} delicious meal
            {meals.length !== 1 ? "s" : ""}
          </p>
        </div>

        <Link href="/meals" className="self-start sm:self-auto">
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-card/90 px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg">
              View All Meals
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </span>
          </motion.div>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {meals.map((meal, index) => (
          <motion.div
            key={meal.id}
            variants={fadeUp}
            transition={{
              duration: 0.24,
              ease: "easeOut",
              delay: Math.min(index * 0.04, 0.2),
            }}
            whileHover={{ y: -4 }}
          >
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
                    {meal?.category && (
                      <Badge className="bg-primary/90 backdrop-blur">
                        {meal.category.name}
                      </Badge>
                    )}
                  </div>

                  {!meal.isAvailable && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <Badge
                        variant="destructive"
                        className="text-lg px-4 py-2"
                      >
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
                    {meal.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {meal.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="font-medium">
                        {meal.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                  {meal.prepTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{meal.prepTime} min</span>
                    </div>
                  )}
                  {meal.calories && (
                    <div className="flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      <span>{meal.calories} cal</span>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-primary font-semibold">৳</span>
                  <span className="text-2xl font-bold">{meal.price}</span>
                </div>
                <Button
                  size="sm"
                  disabled={meal.isAvailable === false}
                  onClick={() => handleAddToCart(meal)}
                  className="rounded-lg px-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
