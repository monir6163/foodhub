"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Loader2, Search, Trash2, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type Blog = {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    name?: string;
    email?: string;
  };
};

type AllBlogsClientProps = {
  blogs: Blog[];
};

export default function AllBlogsClient({ blogs }: AllBlogsClientProps) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL as string;

  const filteredBlogs = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return blogs;

    return blogs.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(query) ||
        blog.slug.toLowerCase().includes(query) ||
        blog.content.toLowerCase().includes(query) ||
        blog.user?.name?.toLowerCase().includes(query)
      );
    });
  }, [blogs, searchText]);

  const formatDate = (value?: string) => {
    if (!value) return "N/A";
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = async (id: number, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setDeletingId(id);
    try {
      const response = await fetch(`${BACKEND_URL}/api/blogs/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Failed to delete blog");
      }

      toast.success("Blog deleted successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete blog");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10"
              placeholder="Search by title, slug, content, or author"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredBlogs.map((blog) => (
          <Card key={blog.id} className="overflow-hidden">
            {blog.thumbnail ? (
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="h-48 w-full bg-muted" />
            )}

            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">ID: {blog.id}</Badge>
                  <Badge variant="outline">{blog.slug}</Badge>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={deletingId === blog.id}
                  onClick={() => handleDelete(blog.id, blog.title)}
                  className="h-8 px-2.5"
                >
                  {deletingId === blog.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </>
                  )}
                </Button>
              </div>
              <CardTitle className="line-clamp-2 text-xl">
                {blog.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {blog.content}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <UserRound className="h-3.5 w-3.5" />
                  {blog.user?.name || blog.userId}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(blog.createdAt)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            No blogs found.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
