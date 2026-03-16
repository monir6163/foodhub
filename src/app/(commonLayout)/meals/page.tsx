import { MealsClient } from "@/components/modules/meals/MealsClient";
import { MealsHero } from "@/components/modules/meals/MealsHero";
import { mealService } from "@/services/meal.service";
import { SearchParamsType } from "@/types/meal.type";

async function getMeals(searchParams: SearchParamsType) {
  try {
    const response = await mealService.getMeals({
      page: searchParams.page ? parseInt(searchParams.page) : 1,
      limit: 9,
      search: searchParams.search,
      cuisine:
        searchParams.cuisine !== "All" ? searchParams.cuisine : undefined,
      dietary: searchParams.dietary,
      mealType:
        searchParams.mealType !== "All"
          ? searchParams.mealType?.toLowerCase()
          : undefined,
      spiceLevel:
        searchParams.spiceLevel !== "All"
          ? searchParams.spiceLevel?.toLowerCase()
          : undefined,
      minPrice: searchParams.minPrice
        ? parseInt(searchParams.minPrice)
        : undefined,
      maxPrice: searchParams.maxPrice
        ? parseInt(searchParams.maxPrice)
        : undefined,
      sortBy: searchParams.sortBy || "createdAt",
      sortOrder: searchParams.sortOrder || "desc",
    });

    if (response.status && response.data) {
      console.log("Pagination data:", response.data.data.pagination);
      return {
        meals: response.data.data.data || [],
        pagination: response.data.data.pagination || {
          total: 0,
          page: 1,
          limit: 9,
          totalPages: 1,
        },
      };
    }
    return {
      meals: [],
      pagination: { total: 0, page: 1, limit: 9, totalPages: 1 },
    };
  } catch (error) {
    console.error("Error fetching meals:", error);
    return {
      meals: [],
      pagination: { total: 0, page: 1, limit: 9, totalPages: 1 },
    };
  }
}

export default async function MealsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) {
  const params = await searchParams;
  const [{ meals, pagination }, cuisinesRes, dietaryRes, mealTypesRes] =
    await Promise.all([
      getMeals(params),
      mealService.getCuisineOptions(),
      mealService.getDietaryOptions(),
      mealService.getMealTypes(),
    ]);

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <MealsHero />
      <MealsClient
        initialMeals={meals}
        initialPagination={pagination}
        cuisines={cuisinesRes.data || []}
        dietaryOptions={dietaryRes.data || []}
        mealTypes={mealTypesRes.data || []}
      />
    </div>
  );
}
