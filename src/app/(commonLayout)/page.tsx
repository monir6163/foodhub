import { categoryActions } from "@/actions/categories";
import { getPopularMeals } from "@/actions/reviews";
import { AppDownloadSection } from "@/components/modules/Home/AppDownloadSection";
import { BecomeProviderSection } from "@/components/modules/Home/BecomeProviderSection";
import { CategorySlider } from "@/components/modules/Home/CategorySlider";
import { FaqSection } from "@/components/modules/Home/FaqSection";
import { FoodHubAdvantage } from "@/components/modules/Home/FoodHubAdvantage";
import HeroSection from "@/components/modules/Home/Hero";
import { HowItWorks } from "@/components/modules/Home/HowItWorks";
import { NewsletterSection } from "@/components/modules/Home/NewsletterSection";
import { OffersSection } from "@/components/modules/Home/OffersSection";
import { OrderTracking } from "@/components/modules/Home/OrderTracking";
import { PopularMeals } from "@/components/modules/Home/PopularMeals";
import { TestimonialsSection } from "@/components/modules/Home/TestimonialsSection";
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
        <PopularMeals
          meals={Array.isArray(meals) ? meals : meals?.data || []}
        />
      </Suspense>
      <HowItWorks />
      <FoodHubAdvantage />
      <OffersSection />
      <OrderTracking />
      <TestimonialsSection />
      <FaqSection />
      <AppDownloadSection />
      <NewsletterSection />
      <BecomeProviderSection />
    </>
  );
}
// export const revalidate = 300;
