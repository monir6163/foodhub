import { categoryService } from "@/services/category.service";

export const categoryActions = async () => {
  const res = await categoryService.getCategories();
  return res;
};
