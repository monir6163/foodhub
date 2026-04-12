"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Blog = {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string | null;
  createdAt?: string;
  user?: {
    name?: string;
  };
};

type BlogListPageProps = {
  blogs: Blog[];
  currentPage: number;
  totalPages: number;
  limit: number;
};

export default function BlogListPage({
  blogs,
  currentPage,
  totalPages,
  limit,
}: BlogListPageProps) {
  const [searchText, setSearchText] = useState("");

  const formatDate = (value?: string) => {
    if (!value) return "N/A";
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredBlogs = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return blogs;

    return blogs.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(query) ||
        blog.content.toLowerCase().includes(query) ||
        blog.slug.toLowerCase().includes(query) ||
        blog.user?.name?.toLowerCase().includes(query)
      );
    });
  }, [blogs, searchText]);

  return (
    <div className="bg-background">
      <section className="py-16 md:py-24 bg-linear-to-b from-background to-red-600/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="bg-red-600/10 text-red-600 hover:bg-red-600/15">
              FoodHub Blog
            </Badge>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-foreground">
              Stories, Tips, and Food Inspiration
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Explore practical guides, healthy ideas, and trending food topics
              from the FoodHub team.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search blogs by title, content, or author"
              className="pl-10"
            />
          </div>

          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link href={`/blog/${blog.slug}`}>
                    {blog.thumbnail ? (
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-52 w-full bg-muted" />
                    )}
                  </Link>

                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(blog.createdAt)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <UserRound className="h-3.5 w-3.5" />
                        {blog.user?.name || "FoodHub"}
                      </span>
                    </div>

                    <Link href={`/blog/${blog.slug}`}>
                      <h2 className="line-clamp-2 text-xl font-bold text-foreground transition-colors group-hover:text-red-600">
                        {blog.title}
                      </h2>
                    </Link>

                    <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                      {blog.content}
                    </p>

                    <Button
                      asChild
                      variant="ghost"
                      className="mt-3 p-0 text-red-600 hover:text-red-500"
                    >
                      <Link href={`/blog/${blog.slug}`}>Read details</Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 py-20 text-center text-muted-foreground">
              {searchText.trim()
                ? "No matching blogs found on this page."
                : "No blogs available right now."}
            </div>
          )}

          <div className="mt-10 flex items-center justify-between rounded-xl border px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <Button asChild variant="outline" disabled={currentPage <= 1}>
                <Link
                  href={`/blog?page=${Math.max(currentPage - 1, 1)}&limit=${limit}`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                disabled={currentPage >= totalPages}
              >
                <Link
                  href={`/blog?page=${Math.min(currentPage + 1, totalPages)}&limit=${limit}`}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
