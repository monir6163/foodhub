import { CategorySlider } from "@/components/modules/Home/CategorySlider";
import HeroSection from "@/components/modules/Home/Hero";
import { HowItWorks } from "@/components/modules/Home/HowItWorks";
import { OrderTracking } from "@/components/modules/Home/OrderTracking";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySlider />
      <HowItWorks />
      <OrderTracking />
    </>
  );
}
