import { getAllBlogs } from "@/actions/blogs";
import AllBlogsClient from "@/components/modules/admin/AllBlogsClient";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";

type SearchParams = {
  page?: string;
  limit?: string;
};

export default async function AllBlogsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const limit = Number(params?.limit || 10);

  const response = await getAllBlogs({
    page,
    limit,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const blogs = response?.data || [];
  const meta = response?.meta;

  const currentPage = meta?.page || page;
  const totalPages = meta?.totalPages || 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">All Blogs</h1>
          <p className="text-muted-foreground">
            Browse all generated and saved blog posts.
          </p>
        </div>
      </div>

      <AllBlogsClient blogs={blogs} />

      <div className="flex items-center justify-between rounded-lg border px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" disabled={currentPage <= 1}>
            <Link
              href={`/admin-dashboard/all-blogs?page=${Math.max(currentPage - 1, 1)}&limit=${limit}`}
            >
              Previous
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            disabled={currentPage >= totalPages}
          >
            <Link
              href={`/admin-dashboard/all-blogs?page=${Math.min(currentPage + 1, totalPages)}&limit=${limit}`}
            >
              Next
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
