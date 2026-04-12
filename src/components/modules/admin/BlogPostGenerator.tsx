"use client";

import { generateBlogPost } from "@/actions/blogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Copy,
  FileText,
  Link2,
  Loader2,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type BlogRecord = {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string | null;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
};

type BlogGeneratorResponse = {
  blog: BlogRecord;
  generatedContent: string;
  description: string | null;
};

const suggestedTopics = [
  "Healthy meal prep ideas",
  "Best foods for rainy day cravings",
  "How to choose a balanced lunch",
  "Top comfort foods in Bangladesh",
  "High-protein meals for busy people",
  "Spicy food trends food lovers enjoy",
];

export default function BlogPostGenerator() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BlogGeneratorResponse | null>(null);

  const handleGenerate = async (value?: string) => {
    const finalTopic = (value ?? topic).trim();

    if (!finalTopic) {
      toast.error("Please enter a blog topic");
      return;
    }

    setLoading(true);
    try {
      const payload = await generateBlogPost(finalTopic);

      if (!payload?.status || !payload?.data) {
        throw new Error(payload?.message || "Failed to generate blog post");
      }

      setResult(payload.data as BlogGeneratorResponse);
      toast.success("Blog post generated and saved successfully");
      setTimeout(() => {
        router.push("/admin-dashboard/all-blogs");
      }, 700);
    } catch (error: any) {
      toast.error(error?.message || "Failed to generate blog post");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy text");
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card className="overflow-hidden border-border/60 bg-linear-to-br from-background via-background to-orange-500/5 shadow-lg">
        <CardHeader className="space-y-4 border-b border-border/60 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-red-600 shadow-lg shadow-red-500/20">
              <WandSparkles className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-2xl text-white">
                AI Blog Post Generator
              </CardTitle>
              <CardDescription className="text-white/65">
                Generate a food blog post and save it directly to the database.
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-white/10 text-white hover:bg-white/15">
              Saves to Blogs table
            </Badge>
            <Badge className="bg-white/10 text-white hover:bg-white/15">
              Uses admin session
            </Badge>
            <Badge className="bg-white/10 text-white hover:bg-white/15">
              Returns persisted record
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="topic">Blog topic</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Example: Healthy dinner ideas for busy families"
              className="h-11"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-orange-500" />
              Suggested topics
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setTopic(suggestion);
                    handleGenerate(suggestion);
                  }}
                  className={cn(
                    "rounded-full border border-border/70 bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-white",
                    loading && "pointer-events-none opacity-70",
                  )}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => handleGenerate()}
            disabled={loading}
            className="h-11 w-full gap-2 bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-red-500/20 hover:from-orange-600 hover:to-red-500"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating & saving...
              </>
            ) : (
              <>
                <WandSparkles className="h-4 w-4" />
                Generate Blog Post
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-lg">
        <CardHeader className="border-b border-border/60">
          <CardTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5 text-orange-500" />
            Saved Blog Preview
          </CardTitle>
          <CardDescription>
            The generated blog record appears here after it is stored in the
            database.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 p-6">
          {result ? (
            <>
              <div className="space-y-2 rounded-2xl border border-border/70 bg-muted/30 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">
                      {result.blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {result.description || "No short description returned"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(result.blog.slug)}
                    className="shrink-0 gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy slug
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline">Slug: {result.blog.slug}</Badge>
                  <Badge variant="outline">ID: {result.blog.id}</Badge>
                  <Badge variant="outline">Author: {result.blog.userId}</Badge>
                </div>

                {result.blog.thumbnail && (
                  <a
                    href={result.blog.thumbnail}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-orange-600 hover:underline"
                  >
                    <Link2 className="h-4 w-4" />
                    Open thumbnail
                  </a>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Generated Content
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(result.generatedContent)}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy content
                  </Button>
                </div>
                <pre className="max-h-112 overflow-auto rounded-2xl border border-border/70 bg-slate-950 p-4 text-sm leading-6 text-slate-100 whitespace-pre-wrap">
                  {result.generatedContent}
                </pre>
              </div>
            </>
          ) : (
            <div className="flex min-h-112 flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 p-8 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                <FileText className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold">No blog generated yet</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Enter a topic and generate a blog post. The saved result will
                show up here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
