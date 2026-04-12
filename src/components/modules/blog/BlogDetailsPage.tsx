import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft, UserRound } from "lucide-react";
import Link from "next/link";

type Blog = {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string | null;
  createdAt?: string;
  user?: {
    name?: string;
    email?: string;
  };
};

type BlogDetailsPageProps = {
  blog: Blog;
};

export default function BlogDetailsPage({ blog }: BlogDetailsPageProps) {
  const formatDate = (value?: string) => {
    if (!value) return "N/A";
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const lines = blog.content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="bg-background">
      <section className="py-14 md:py-20 bg-linear-to-b from-background to-red-600/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-500"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to blogs
          </Link>

          <div className="mt-6">
            <Badge className="bg-red-600/10 text-red-600 hover:bg-red-600/15">
              FoodHub Blog
            </Badge>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-foreground">
              {blog.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="h-4 w-4" />
                {blog.user?.name || "FoodHub"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(blog.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {blog.thumbnail && (
            <div className="overflow-hidden rounded-3xl border border-border/60 shadow-xl">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="h-[280px] md:h-[420px] w-full object-cover"
              />
            </div>
          )}

          <article className="mt-8 rounded-3xl border border-border/60 bg-card p-6 md:p-10 shadow-sm">
            <div className="space-y-5 text-[15px] leading-8 text-foreground/90">
              {lines.map((line, index) => {
                if (line.startsWith("### ")) {
                  return (
                    <h3
                      key={index}
                      className="text-xl font-bold text-foreground pt-2"
                    >
                      {line.replace(/^###\s+/, "")}
                    </h3>
                  );
                }

                if (line.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="text-2xl font-bold text-foreground pt-3"
                    >
                      {line.replace(/^##\s+/, "")}
                    </h2>
                  );
                }

                if (line.startsWith("# ")) {
                  return (
                    <h1
                      key={index}
                      className="text-3xl font-bold text-foreground pt-4"
                    >
                      {line.replace(/^#\s+/, "")}
                    </h1>
                  );
                }

                if (line.startsWith("- ")) {
                  return (
                    <p key={index} className="pl-5 relative text-foreground/85">
                      <span className="absolute left-0 top-3 h-1.5 w-1.5 rounded-full bg-red-500" />
                      {line.replace(/^-\s+/, "")}
                    </p>
                  );
                }

                return (
                  <p key={index} className="text-foreground/85">
                    {line}
                  </p>
                );
              })}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
