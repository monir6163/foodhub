import { categoryActions } from "@/actions/categories";
import { CategorySlider } from "@/components/modules/Home/CategorySlider";
import HeroSection from "@/components/modules/Home/Hero";
import { HowItWorks } from "@/components/modules/Home/HowItWorks";
import { OrderTracking } from "@/components/modules/Home/OrderTracking";
import { PopularMeals } from "@/components/modules/Home/PopularMeals";
import {
  CategorySliderSkeleton,
  PopularMealsSkeleton,
} from "@/helper/skelitonLoader";
import { demoMeals } from "@/lib/demo-data";
import { Suspense } from "react";

async function getHomeData() {
  try {
    const [categoriesData] = await Promise.all([categoryActions()]);
    return {
      categories: categoriesData?.data?.data || [],
      meals: demoMeals.slice(0, 6) || [],
      error: null,
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return {
      categories: [],
      meals: [],
      error: "Failed to load data",
    };
  }
}

export default async function Home() {
  const { categories, meals, error } = await getHomeData();

  return (
    <>
      <HeroSection />
      <Suspense fallback={<CategorySliderSkeleton />}>
        <CategorySlider categories={categories} />
      </Suspense>
      <Suspense fallback={<PopularMealsSkeleton />}>
        <PopularMeals meals={meals} />
      </Suspense>
      <HowItWorks />
      <OrderTracking />
    </>
  );
}
// export const revalidate = 300;
