import AddMealForm from "@/components/modules/providers/AddMealForm";
import { categoryService } from "@/services/category.service";

export default async function AddMealsPage() {
  // Fetch categories for the form
  const { data: categoriesData } = await categoryService.getCategories();
  const categories = categoriesData?.data || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <AddMealForm categories={categories} />
    </div>
  );
}
