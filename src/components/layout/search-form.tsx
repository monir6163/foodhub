"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { mealService } from "@/services/meal.service";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const suggestedKeywords = [
  "Pizza",
  "Burger",
  "Healthy",
  "Biryani",
  "Pasta",
  "Dessert",
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchMeal {
  id: string;
  name: string;
  price: number;
  image?: string | null;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchMeal[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value: string) => {
    setQuery(value);

    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await mealService.getMeals({
        search: value,
        limit: 6,
        page: 1,
      });
      const meals = response?.data?.data?.data || [];
      setResults(Array.isArray(meals) ? meals : []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Search Meals</DialogTitle>
          <DialogDescription>
            Type at least 2 characters to find meals quickly.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Try: burger, healthy, pasta..."
              className="h-11 pl-9"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {suggestedKeywords.map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => handleSearch(keyword)}
                className="rounded-full border border-border/70 bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-red-600 hover:text-white hover:border-red-600"
              >
                {keyword}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-sm text-muted-foreground">Searching...</p>
          ) : results.length > 0 ? (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {results.map((meal) => (
                <Link
                  key={meal.id}
                  href={`/meals/${meal.id}`}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {meal.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ৳{meal.price}
                    </p>
                  </div>
                  <span className="text-xs text-red-600 font-medium">View</span>
                </Link>
              ))}
            </div>
          ) : query.trim().length >= 2 ? (
            <p className="text-sm text-muted-foreground">No meals found.</p>
          ) : (
            <Button asChild className="w-full h-11">
              <Link href="/meals" onClick={onClose}>
                Browse All Meals
              </Link>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
