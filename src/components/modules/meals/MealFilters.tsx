"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Filter, X } from "lucide-react";
import { useState } from "react";

interface MealFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  onClearSearch: () => void;
  filters: FilterValues;
  cuisines?: string[];
  dietaryOptions?: string[];
  mealTypes?: string[];
}

export interface FilterValues {
  cuisine: string;
  dietary: string[];
  mealType: string;
  spiceLevel: string;
  priceRange: [number, number];
  sortBy: string;
  sortOrder: string;
}

const spiceLevels = ["All", "Low", "Medium", "High"];
const sortOptions = [
  { value: "createdAt", label: "Newest First" },
  { value: "price", label: "Price" },
  { value: "name", label: "Name" },
  { value: "calories", label: "Calories" },
];
const sortOrders = [
  { value: "desc", label: "Descending" },
  { value: "asc", label: "Ascending" },
];

export function MealFilters({
  onFilterChange,
  onClearSearch,
  filters,
  cuisines = [],
  dietaryOptions = [],
  mealTypes = [],
}: MealFiltersProps) {
  const [isOpen, setIsOpen] = useState(true);

  const cuisineList = ["All", ...cuisines];
  const mealTypeList = ["All", ...mealTypes];

  const handleCuisineChange = (value: string) => {
    onFilterChange({ ...filters, cuisine: value });
  };

  const handleDietaryChange = (dietary: string) => {
    const newDietary = filters.dietary.includes(dietary)
      ? filters.dietary.filter((d) => d !== dietary)
      : [...filters.dietary, dietary];
    onFilterChange({ ...filters, dietary: newDietary });
  };

  const handleMealTypeChange = (value: string) => {
    onFilterChange({ ...filters, mealType: value });
  };

  const handleSpiceLevelChange = (value: string) => {
    onFilterChange({ ...filters, spiceLevel: value });
  };

  const handlePriceRangeChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleSortByChange = (value: string) => {
    onFilterChange({ ...filters, sortBy: value });
  };

  const handleSortOrderChange = (value: string) => {
    onFilterChange({ ...filters, sortOrder: value });
  };

  const handleClearFilters = () => {
    onClearSearch();
    onFilterChange({
      cuisine: "All",
      dietary: [],
      mealType: "All",
      spiceLevel: "All",
      priceRange: [0, 1000],
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  };

  const hasActiveFilters =
    filters.cuisine !== "All" ||
    filters.dietary.length > 0 ||
    filters.mealType !== "All" ||
    filters.spiceLevel !== "All" ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 1000 ||
    filters.sortBy !== "createdAt" ||
    filters.sortOrder !== "desc";

  return (
    <Card className="sticky top-20 border-2 shadow-lg">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Filters</h2>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        <Separator />

        {/* Cuisine Filter */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Cuisine</Label>
          <RadioGroup
            value={filters.cuisine}
            onValueChange={handleCuisineChange}
          >
            {cuisineList.map((cuisine) => (
              <div key={cuisine} className="flex items-center space-x-2">
                <RadioGroupItem value={cuisine} id={`cuisine-${cuisine}`} />
                <Label
                  htmlFor={`cuisine-${cuisine}`}
                  className="font-normal cursor-pointer"
                >
                  {cuisine}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Dietary Filter */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Dietary</Label>
          <div className="space-y-2">
            {dietaryOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`dietary-${option}`}
                  checked={filters.dietary.includes(option)}
                  onCheckedChange={() => handleDietaryChange(option)}
                />
                <Label
                  htmlFor={`dietary-${option}`}
                  className="font-normal cursor-pointer capitalize"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Meal Type Filter */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Meal Type</Label>
          <RadioGroup
            value={filters.mealType}
            onValueChange={handleMealTypeChange}
          >
            {mealTypeList.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={`mealType-${type}`} />
                <Label
                  htmlFor={`mealType-${type}`}
                  className="font-normal cursor-pointer"
                >
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Spice Level Filter */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Spice Level</Label>
          <RadioGroup
            value={filters.spiceLevel}
            onValueChange={handleSpiceLevelChange}
          >
            {spiceLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <RadioGroupItem value={level} id={`spice-${level}`} />
                <Label
                  htmlFor={`spice-${level}`}
                  className="font-normal cursor-pointer"
                >
                  {level}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Price Range Filter */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Price Range</Label>
          <div className="pt-2">
            <Slider
              min={0}
              max={1000}
              step={10}
              value={filters.priceRange}
              onValueChange={handlePriceRangeChange}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>৳{filters.priceRange[0]}</span>
              <span>৳{filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Sort By Filter */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Sort By</Label>
          <RadioGroup value={filters.sortBy} onValueChange={handleSortByChange}>
            {sortOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`sort-${option.value}`}
                />
                <Label
                  htmlFor={`sort-${option.value}`}
                  className="font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Sort Order Filter */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Sort Order</Label>
          <RadioGroup
            value={filters.sortOrder}
            onValueChange={handleSortOrderChange}
          >
            {sortOrders.map((order) => (
              <div key={order.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={order.value}
                  id={`order-${order.value}`}
                />
                <Label
                  htmlFor={`order-${order.value}`}
                  className="font-normal cursor-pointer"
                >
                  {order.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
