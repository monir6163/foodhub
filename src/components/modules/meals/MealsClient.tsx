"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { MealsClientPropsType } from "@/types/meal.type";
import { Loader, Search, SlidersHorizontal, Utensils } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { MealCard } from "./MealCard";
import { FilterValues, MealFilters } from "./MealFilters";
import PaginationControls from "./Pagination";

export function MealsClient({
  initialMeals,
  initialPagination,
  cuisines,
  dietaryOptions,
  mealTypes,
}: MealsClientPropsType) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    category: searchParams.get("category") || undefined,
    cuisine: searchParams.get("cuisine") || "All",
    dietary: searchParams.get("dietary")?.split(",").filter(Boolean) || [],
    mealType: searchParams.get("mealType") || "All",
    spiceLevel: searchParams.get("spiceLevel") || "All",
    priceRange: [
      parseInt(searchParams.get("minPrice") || "0"),
      parseInt(searchParams.get("maxPrice") || "1000"),
    ],
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "desc",
  });

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const currentSearch = searchParams.get("search") || "";
      if (searchQuery !== currentSearch) {
        updateURL(1, filters, searchQuery);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const updateURL = useCallback(
    (page: number, currentFilters: FilterValues, search: string) => {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      if (search) params.set("search", search);
      if (currentFilters.category)
        params.set("category", currentFilters.category);
      if (currentFilters.cuisine !== "All")
        params.set("cuisine", currentFilters.cuisine);
      if (currentFilters.dietary.length > 0)
        params.set("dietary", currentFilters.dietary.join(","));
      if (currentFilters.mealType !== "All")
        params.set("mealType", currentFilters.mealType);
      if (currentFilters.spiceLevel !== "All")
        params.set("spiceLevel", currentFilters.spiceLevel);
      if (currentFilters.priceRange[0] !== 0)
        params.set("minPrice", currentFilters.priceRange[0].toString());
      if (currentFilters.priceRange[1] !== 1000)
        params.set("maxPrice", currentFilters.priceRange[1].toString());
      params.set("sortBy", currentFilters.sortBy);
      params.set("sortOrder", currentFilters.sortOrder);

      startTransition(() => {
        router.push(`/meals?${params.toString()}`);
      });
    },
    [router],
  );

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    updateURL(1, newFilters, searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const hasActiveFilters =
    !!filters.category ||
    filters.cuisine !== "All" ||
    filters.dietary.length > 0 ||
    filters.mealType !== "All" ||
    filters.spiceLevel !== "All" ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 1000 ||
    filters.sortBy !== "createdAt" ||
    filters.sortOrder !== "desc";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {isPending && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center flex justify-center gap-1">
              <Loader className="mx-auto h-6 w-6 text-primary animate-spin" />
              <p className=" text-primary">Please wait...</p>
            </div>
          </div>
        )}
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-1">
          <MealFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearSearch={handleClearSearch}
            cuisines={cuisines}
            dietaryOptions={dietaryOptions}
            mealTypes={mealTypes}
          />
        </aside>

        {/* Mobile Filters */}
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetContent
            side="left"
            className="w-[88%] max-w-sm overflow-y-auto p-4"
          >
            <MealFilters
              className="static top-0"
              filters={filters}
              onFilterChange={(newFilters) => {
                handleFilterChange(newFilters);
                setMobileFiltersOpen(false);
              }}
              onClearSearch={() => {
                handleClearSearch();
                setMobileFiltersOpen(false);
              }}
              cuisines={cuisines}
              dietaryOptions={dietaryOptions}
              mealTypes={mealTypes}
            />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-6">
          {/* Mobile Filter Toggle + Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-12 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Active
                </span>
              )}
            </Button>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search meals by name or description..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 h-12 bg-background"
              />
            </div>
          </div>

          {/* Meals Grid */}
          {initialMeals.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Utensils className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">No meals found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {initialMeals.map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>

              {/* Pagination */}
              <PaginationControls meta={initialPagination} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
