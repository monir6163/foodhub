import { getProviderMeals } from "@/actions/getProviders";
import MealCard from "@/components/modules/providers/MealCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Plus, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export default async function MealsPage() {
  const { data, error, status } = await getProviderMeals();

  const meals = data?.data?.data || [];
  const totalMeals = meals.length;
  const availableMeals = meals.filter((meal: any) => meal.isAvailable).length;
  const totalRevenue = meals.reduce(
    (sum: number, meal: any) => sum + (meal.price || 0),
    0,
  );

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Meals</h1>
          <p className="text-muted-foreground mt-1">
            Manage your meal offerings and availability
          </p>
        </div>
        <Link href="/provider-dashboard/meals/add">
          <Button size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Meal
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Meals</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMeals}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {availableMeals} currently available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Meals
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableMeals}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalMeals - availableMeals} unavailable
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {totalMeals > 0 ? (totalRevenue / totalMeals).toFixed(2) : "0.00"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Per meal average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Meals Grid */}
      {meals.length === 0 ? (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <UtensilsCrossed className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No meals yet</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Get started by adding your first meal
              </p>
            </div>
            <Link href="/provider-dashboard/meals/add">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Meal
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals?.map((meal: any) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}
