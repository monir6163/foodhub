import { categoryActions } from "@/actions/categories";
import { getPopularMeals } from "@/actions/reviews";
import { CategorySlider } from "@/components/modules/Home/CategorySlider";
import { FoodHubAdvantage } from "@/components/modules/Home/FoodHubAdvantage";
import HeroSection from "@/components/modules/Home/Hero";
import { HowItWorks } from "@/components/modules/Home/HowItWorks";
import { OffersSection } from "@/components/modules/Home/OffersSection";
import { OrderTracking } from "@/components/modules/Home/OrderTracking";
import { PopularMeals } from "@/components/modules/Home/PopularMeals";
import PopularProvider from "@/components/modules/Home/PopularProvider";
import {
  CategorySliderSkeleton,
  PopularMealsSkeleton,
} from "@/helper/skelitonLoader";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

async function getHomeData() {
  try {
    const [categoriesData, popularMealsData] = await Promise.all([
      categoryActions(),
      getPopularMeals(),
    ]);
    return {
      categories: categoriesData?.data?.data || [],
      meals: popularMealsData?.data?.data || [],
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
        <PopularMeals meals={meals?.data} />
      </Suspense>
      <FoodHubAdvantage />
      <OffersSection />
      <HowItWorks />
      <PopularProvider />
      <OrderTracking />
    </>
  );
}
// export const revalidate = 300;
