import { getMealById } from "@/actions/getProviders";
import EditMealForm from "@/components/modules/providers/EditMealForm";
import { categoryService } from "@/services/category.service";
import { notFound } from "next/navigation";

export default async function EditMealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [{ data: mealData }, { data: categoriesData }] = await Promise.all([
    getMealById(id),
    categoryService.getCategories(),
  ]);

  if (!mealData || !mealData.data) {
    notFound();
  }

  const meal = mealData.data;
  const categories = categoriesData?.data || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Edit Meal</h1>
        <p className="text-muted-foreground mt-1">
          Update your meal information
        </p>
      </div>
      <EditMealForm meal={meal} categories={categories} />
    </div>
  );
}
