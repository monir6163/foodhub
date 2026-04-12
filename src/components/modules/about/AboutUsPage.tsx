"use client";

import { motion } from "framer-motion";
import {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const values = [
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Every feature and service decision starts with improving your ordering experience.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Quality",
    description:
      "We partner with verified restaurants and maintain quality standards from kitchen to doorstep.",
  },
  {
    icon: Target,
    title: "Fast Execution",
    description:
      "From checkout to delivery tracking, we optimize every step for speed and reliability.",
  },
];

const stats = [
  { label: "Happy Customers", value: "50K+" },
  { label: "Partner Restaurants", value: "500+" },
  { label: "Cities Covered", value: "30+" },
  { label: "Avg Delivery", value: "15 min" },
];

export default function AboutUsPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-background">
      <motion.section
        className="py-20 md:py-28 bg-linear-to-b from-background to-red-600/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">
                <Sparkles className="h-3.5 w-3.5" />
                About FoodHub
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                We are building the most trusted food delivery experience.
              </h1>
              <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl">
                FoodHub connects people with great meals from reliable local
                partners. We focus on quality, speed, and transparency so every
                order feels easy and dependable.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              variants={fadeUp}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="rounded-3xl border border-red-200/60 bg-card p-6 sm:p-8 shadow-2xl overflow-hidden">
                <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-red-500/15 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-orange-400/20 blur-3xl" />
                <div className="relative space-y-4">
                  <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Mission
                    </p>
                    <p className="mt-1 text-base font-semibold text-foreground">
                      Deliver delightful meals with speed, trust, and
                      consistency.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Vision
                    </p>
                    <p className="mt-1 text-base font-semibold text-foreground">
                      Become the everyday food companion for every household.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Our Core Values
            </h2>
            <p className="mt-3 text-muted-foreground text-base sm:text-lg">
              The principles that guide how we build products and serve
              customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="group rounded-2xl border border-border/60 bg-card p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                variants={fadeUp}
                transition={{
                  duration: 0.24,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-xl bg-red-600/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 md:py-24 bg-linear-to-b from-red-600/5 to-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                FoodHub in Numbers
              </h2>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                Growing every month
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border/70 bg-background/80 p-4 sm:p-5"
                >
                  <p className="text-2xl sm:text-3xl font-black text-red-600">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
