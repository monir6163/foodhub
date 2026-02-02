import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroImage from "../../../public/hero-food.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center hero-bg overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Badge */}
            <div className="animate-fade-up opacity-0 stagger-1">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 text-red-600 rounded-full text-sm font-medium">
                <Sparkles size={16} />
                #1 Food Delivery Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground animate-fade-up opacity-0 stagger-2">
              Your Favorite Food,{" "}
              <span className="text-gradient">Delivered Fast</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg animate-fade-up opacity-0 stagger-3">
              Discover amazing food from multiple providers in one place. Order
              from local restaurants and get it delivered to your door in
              minutes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0 stagger-4">
              <Button
                className="flex items-center gap-2 cursor-pointer"
                size="lg"
                variant="destructive"
                type="button"
              >
                Browse Restaurants
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  size={20}
                />
              </Button>
              <Link href={"/providers/become-provider"} passHref>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  Become a Provider
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4 animate-fade-up opacity-0 stagger-4">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  500+
                </p>
                <p className="text-sm text-muted-foreground">Restaurants</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  50k+
                </p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  15 min
                </p>
                <p className="text-sm text-muted-foreground">Avg Delivery</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative w-full h-full animate-fade-up opacity-0 stagger-3">
            <div className="relative h-full">
              <Image
                width={600}
                height={600}
                src={heroImage}
                alt="Delicious food spread"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-xl border border-border animate-fade-up">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Fast Delivery
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Order is on the way!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
