import BlogPostGenerator from "@/components/modules/admin/BlogPostGenerator";
import { Sparkles } from "lucide-react";

export default function BlogPostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Blog Posts (AI)</h1>
          <p className="text-muted-foreground">
            Generate food blog posts and store them directly in the database.
          </p>
        </div>
      </div>

      <BlogPostGenerator />
    </div>
  );
}
