"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Gift, Rocket, Truck, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface Offer {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  expiresIn: number;
  bgGradient?: string;
  badge: string;
  badgeColor: string;
}

const offers: Offer[] = [
  {
    id: "1",
    title: "20% OFF",
    subtitle: "Your First Order",
    icon: <Gift className="w-12 h-12" />,
    description: "On orders above ৳500. Code: FOODHUB20",
    expiresIn: 24,
    bgGradient: "from-rose-500/90 via-red-500/90 to-pink-500/90",
    badge: "HOT DEAL",
    badgeColor: "bg-white/20 text-white",
  },
  {
    id: "2",
    title: "FREE DELIVERY",
    subtitle: "No Minimum Order",
    icon: <Truck className="w-12 h-12" />,
    description: "On all orders. Fresh & hot food guaranteed",
    expiresIn: 12,
    bgGradient: "from-blue-500/90 via-indigo-500/90 to-purple-500/90",
    badge: "LIMITED TIME",
    badgeColor: "bg-white/20 text-white",
  },
  {
    id: "3",
    title: "10X POINTS",
    subtitle: "Loyalty Reward",
    icon: <Rocket className="w-12 h-12" />,
    description: "Earn rewards on every order. Redeem anytime",
    expiresIn: 7 * 24,
    bgGradient: "from-orange-500/90 via-amber-500/90 to-yellow-500/90",
    badge: "EXCLUSIVE",
    badgeColor: "bg-white/20 text-white",
  },
];

function CountdownTimer({ hours }: { hours: number }) {
  const [timeLeft, setTimeLeft] = useState({
    hours,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const key = `offer-time-${hours}`;

    const calculate = () => {
      const total = hours * 3600;
      const now = Date.now();

      let start = localStorage.getItem(key);
      if (!start) {
        start = now.toString();
        localStorage.setItem(key, start);
      }

      const elapsed = Math.floor((now - parseInt(start)) / 1000);
      const remaining = Math.max(total - elapsed, 0);

      setTimeLeft({
        hours: Math.floor(remaining / 3600),
        minutes: Math.floor((remaining % 3600) / 60),
        seconds: remaining % 60,
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);

    return () => clearInterval(interval);
  }, [hours]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-1 text-sm font-semibold">
      {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((t, i) => (
        <div
          key={i}
          className="w-10 h-10 flex items-center justify-center rounded-md bg-white/20 backdrop-blur-md border border-white/30 text-white font-mono"
        >
          {pad(t)}
        </div>
      ))}
    </div>
  );
}

export const OffersSection = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="offers"
      className="py-16 md:py-28 bg-linear-to-b from-background to-muted/30 dark:to-black relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {/* Background blobs (subtle) */}
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          variants={fadeUp}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 rounded-full mb-4">
            <Zap className="w-4 h-4 text-red-600" />
            <span className="text-red-600 text-xs font-bold uppercase">
              Flash Deals
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Offers & Discounts
          </h2>

          <p className="text-muted-foreground text-lg">
            Grab these amazing deals before they expire.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:scale-[1.03] shadow-xl border border-white/10 dark:border-white/5"
              variants={fadeUp}
              transition={{
                duration: 0.24,
                ease: "easeOut",
                delay: index * 0.05,
              }}
              whileHover={{ y: -5 }}
            >
              {/* Gradient */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${offer.bgGradient}`}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/5" />

              {/* Content */}
              <div className="relative p-8 flex flex-col justify-between min-h-95 text-white">
                <div className="space-y-5">
                  {/* Badge */}
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-bold ${offer.badgeColor}`}
                  >
                    {offer.badge}
                  </span>

                  {/* Icon */}
                  <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/25 backdrop-blur-md">
                    {offer.icon}
                  </div>

                  {/* Text */}
                  <p className="text-sm uppercase text-white/80">
                    {offer.subtitle}
                  </p>

                  <h3 className="text-4xl font-black">{offer.title}</h3>

                  <p className="text-white/90">{offer.description}</p>
                </div>

                {/* Bottom */}
                <div className="space-y-4 pt-6">
                  <div>
                    <p className="text-xs uppercase text-white/70 mb-1">
                      Expires In
                    </p>
                    <CountdownTimer hours={offer.expiresIn} />
                  </div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button className="w-full bg-white text-black hover:bg-black hover:text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-all duration-200 font-semibold h-12 rounded-xl shadow-lg">
                      Claim Offer
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 flex justify-center"
          variants={fadeUp}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <div className="flex items-center gap-8 px-8 py-4 rounded-2xl border bg-card/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">50K+</div>
              <p className="text-sm text-muted-foreground">Users</p>
            </div>

            <div className="w-px h-10 bg-border" />

            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">99%</div>
              <p className="text-sm text-muted-foreground">Satisfaction</p>
            </div>

            <div className="w-px h-10 bg-border" />

            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">24/7</div>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
