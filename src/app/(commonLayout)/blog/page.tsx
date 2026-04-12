import { getPublicBlogs } from "@/actions/blogs";
import BlogListPage from "@/components/modules/blog/BlogListPage";

type SearchParams = {
  page?: string;
  limit?: string;
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const limit = Number(params?.limit || 9);

  const response = await getPublicBlogs({
    page,
    limit,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const blogs = response?.data || [];
  const meta = response?.meta;

  return (
    <BlogListPage
      blogs={blogs}
      currentPage={meta?.page || page}
      totalPages={meta?.totalPages || 1}
      limit={limit}
    />
  );
}
