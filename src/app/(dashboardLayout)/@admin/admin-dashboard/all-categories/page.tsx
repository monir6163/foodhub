import { categoryActions } from "@/actions/categories";
import AllCategoriesClient from "@/components/modules/admin/AllCategoriesClient";
import { FolderOpen } from "lucide-react";

export default async function AllCategoriesPage() {
  const { data: response } = await categoryActions();
  const categories = response?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <FolderOpen className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">All Categories</h1>
          <p className="text-muted-foreground">
            Manage meal categories and organization
          </p>
        </div>
      </div>

      <AllCategoriesClient categories={categories} />
    </div>
  );
}
