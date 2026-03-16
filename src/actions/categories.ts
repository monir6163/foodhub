"use server";
import { categoryService } from "@/services/category.service";
import { cookies } from "next/headers";

export const categoryActions = async () => {
  const res = await categoryService.getCategories();
  return res;
};

export const createCategory = async (name: string) => {
  const cookieStore = await cookies();
  const res = await categoryService.createCategory(name, cookieStore);
  return res;
};

export const updateCategory = async (id: string, name: string) => {
  const cookieStore = await cookies();
  const res = await categoryService.updateCategory(id, name, cookieStore);
  return res;
};

export const deleteCategory = async (id: string) => {
  const cookieStore = await cookies();
  const res = await categoryService.deleteCategory(id, cookieStore);
  return res;
};
