"use client";

import { Input } from "@/components/ui/input";
import { MealsClientPropsType } from "@/types/meal.type";
import { Loader, Search, Utensils } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { MealCard } from "./MealCard";
import { FilterValues, MealFilters } from "./MealFilters";
import { Pagination } from "./Pagination";

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
  const [filters, setFilters] = useState<FilterValues>({
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

  const handlePageChange = (page: number) => {
    updateURL(page, filters, searchQuery);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

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
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <MealFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearSearch={handleClearSearch}
            cuisines={cuisines}
            dietaryOptions={dietaryOptions}
            mealTypes={mealTypes}
          />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search meals by name or description..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-12 bg-background"
            />
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {initialMeals.length === 0
                  ? "No meals found"
                  : `${initialMeals.length} Meal${initialMeals.length !== 1 ? "s" : ""} Available`}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Page {initialPagination.page} of {initialPagination.totalPages}
              </p>
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
              <Pagination
                currentPage={initialPagination.page}
                totalPages={initialPagination.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
