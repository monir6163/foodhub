import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMealById } from "@/lib/demo-data";
import {
  ArrowLeft,
  ChefHat,
  Clock,
  Flame,
  Leaf,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface MealDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function MealDetailsPage({
  params,
}: MealDetailsPageProps) {
  const { id } = params;

  // Using demo data
  const meal = getMealById(id);

  if (!meal) {
    notFound();
  }

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
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="relative aspect-square w-full">
                <Image
                  src={
                    meal.image ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=800&fit=crop"
                  }
                  alt={meal.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Availability Badge */}
                {!meal.isAvailable && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="destructive" className="text-2xl px-6 py-3">
                      Currently Unavailable
                    </Badge>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Category Badge */}
            {meal.category && (
              <Badge className="text-sm px-3 py-1">{meal.category.name}</Badge>
            )}

            {/* Title and Price */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {meal.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  ${meal.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {meal.description ||
                  "A delicious meal prepared with care and the finest ingredients."}
              </p>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              {meal.calories && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <Flame className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Calories</p>
                      <p className="font-bold">{meal.calories} kcal</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {meal.cuisine && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <UtensilsCrossed className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Cuisine</p>
                      <p className="font-bold">{meal.cuisine}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {meal.mealType && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Meal Type</p>
                      <p className="font-bold">{meal.mealType}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {meal.spiceLevel && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${getSpiceLevelColor(meal.spiceLevel)}`}
                    >
                      <ChefHat className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Spice Level
                      </p>
                      <p className="font-bold capitalize">{meal.spiceLevel}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Dietary Information */}
            {meal.dietary && meal.dietary.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Dietary Information</h3>
                <div className="flex flex-wrap gap-2">
                  {meal.dietary.map((diet: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-sm gap-2"
                    >
                      <Leaf className="w-4 h-4" />
                      {diet}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {meal.ingredients && meal.ingredients.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {meal.ingredients.map((ingredient: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Provider Info */}
            {meal.provider && (
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold mb-2">Provided by</h3>
                  <p className="text-muted-foreground">
                    {meal.provider.businessName || "Our Kitchen"}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Add to Cart Button */}
            <div className="pt-4 space-y-3">
              <Button
                size="lg"
                className="w-full gap-3 text-lg"
                disabled={!meal.isAvailable}
              >
                <ShoppingCart className="w-5 h-5" />
                {meal.isAvailable ? "Add to Cart" : "Currently Unavailable"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Free delivery on orders over $30
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
