import { getBlogBySlug } from "@/actions/blogs";
import BlogDetailsPage from "@/components/modules/blog/BlogDetailsPage";
import { notFound } from "next/navigation";

export default async function BlogDetailsRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await getBlogBySlug(slug);

  if (!response?.status || !response?.data) {
    notFound();
  }

  return <BlogDetailsPage blog={response.data} />;
}
