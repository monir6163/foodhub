"use client";

import { Button } from "@/components/ui/button";
import { Gift, Rocket, Truck, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface Offer {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  expiresIn: number;
  bgGradient: string;
  textColor: string;
  badge: string;
  badgeColor: string;
}

const offers: Offer[] = [
  {
    id: "1",
    title: "20% OFF",
    subtitle: "Your First Order",
    icon: <Gift className="w-12 h-12 sm:w-14 sm:h-14" />,
    description: "On orders above ৳500. Code: FOODHUB20",
    expiresIn: 24,
    bgGradient: "from-pink-500 via-rose-500 to-red-500",
    textColor: "text-white",
    badge: "HOT DEAL",
    badgeColor: "bg-white/20 text-white",
  },
  {
    id: "2",
    title: "FREE DELIVERY",
    subtitle: "No Minimum Order",
    icon: <Truck className="w-12 h-12 sm:w-14 sm:h-14" />,
    description: "On all orders. Fresh & hot food guaranteed",
    expiresIn: 12,
    bgGradient: "from-blue-500 via-blue-600 to-indigo-600",
    textColor: "text-white",
    badge: "LIMITED TIME",
    badgeColor: "bg-white/20 text-white",
  },
  {
    id: "3",
    title: "10X POINTS",
    subtitle: "Loyalty Reward",
    icon: <Rocket className="w-12 h-12 sm:w-14 sm:h-14" />,
    description: "Earn rewards on every order. Redeem anytime",
    expiresIn: 7 * 24,
    bgGradient: "from-orange-500 via-amber-500 to-yellow-500",
    textColor: "text-white",
    badge: "EXCLUSIVE",
    badgeColor: "bg-white/20 text-white",
  },
];

function CountdownTimer({ hours }: { hours: number }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: hours,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const totalSeconds = hours * 3600;
      const now = new Date();
      const storedTime = localStorage.getItem(`offer-time-${hours}`);
      const startTime = storedTime ? parseInt(storedTime) : now.getTime();

      if (!storedTime) {
        localStorage.setItem(`offer-time-${hours}`, startTime.toString());
      }

      const elapsed = Math.floor((now.getTime() - startTime) / 1000);
      const remaining = Math.max(totalSeconds - elapsed, 0);

      const h = Math.floor(remaining / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      const s = remaining % 60;

      setTimeLeft({
        hours: h,
        minutes: m,
        seconds: s,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [hours]);

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex items-center gap-1.5 text-sm font-black">
      <span className="inline-flex items-center justify-center w-12 h-12 bg-white/30 backdrop-blur-md rounded-lg font-mono text-white border border-white/50 shadow-lg">
        {pad(timeLeft.hours)}
      </span>
      <span className="text-white/90 text-lg font-bold">:</span>
      <span className="inline-flex items-center justify-center w-12 h-12 bg-white/30 backdrop-blur-md rounded-lg font-mono text-white border border-white/50 shadow-lg">
        {pad(timeLeft.minutes)}
      </span>
      <span className="text-white/90 text-lg font-bold">:</span>
      <span className="inline-flex items-center justify-center w-12 h-12 bg-white/30 backdrop-blur-md rounded-lg font-mono text-white border border-white/50 shadow-lg">
        {pad(timeLeft.seconds)}
      </span>
    </div>
  );
}

export const OffersSection = () => {
  return (
    <section
      id="offers"
      className="py-16 md:py-28 bg-background relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 rounded-full mb-4">
            <Zap className="w-4 h-4 text-red-600" />
            <span className="text-red-600 text-sm font-bold uppercase tracking-wider">
              Flash Deals
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
            Offers & Discounts
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Grab these amazing deals before they expire. Limited time offers!
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="relative rounded-3xl overflow-hidden transition-all duration-500"
            >
              {/* Gradient Background - Always Visible */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${offer.bgGradient} -z-10`}
              />

              {/* Overlay for text contrast - works in both dark and light modes */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent -z-10" />

              {/* Content */}
              <div className="relative h-full p-8 sm:p-10 flex flex-col justify-between min-h-96">
                {/* Top Section */}
                <div className="space-y-6">
                  {/* Badge */}
                  <div className="inline-flex">
                    <div
                      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/40 shadow-lg ${offer.badgeColor}`}
                    >
                      {offer.badge}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 shadow-lg border border-white/30">
                    {offer.icon}
                  </div>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-base font-bold text-white/80 uppercase tracking-wider">
                    {offer.subtitle}
                  </p>

                  {/* Title */}
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none">
                    {offer.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="space-y-4 pt-6">
                  {/* Countdown Timer */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
                      ⏰ Offer Expires In:
                    </p>
                    <CountdownTimer hours={offer.expiresIn} />
                  </div>

                  {/* Claim Button */}
                  <Button className="w-full bg-white text-black shadow-2xl transition-all duration-300 font-bold text-base sm:text-lg h-12 sm:h-14 rounded-xl">
                    Claim Offer
                  </Button>
                </div>
              </div>

              {/* Shine Effects - Always Visible */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-lg mb-6">
            More deals coming every day. Check back regularly!
          </p>
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-card rounded-2xl border border-border/50">
            <div className="text-center">
              <div className="text-3xl font-black text-red-600">50K+</div>
              <p className="text-sm text-muted-foreground mt-1">Happy Users</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-black text-blue-600">99%</div>
              <p className="text-sm text-muted-foreground mt-1">Satisfaction</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-black text-orange-600">24/7</div>
              <p className="text-sm text-muted-foreground mt-1">Live Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
