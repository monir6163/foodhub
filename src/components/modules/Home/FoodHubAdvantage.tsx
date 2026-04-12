"use client";

import { motion } from "framer-motion";
import { Clock, Trophy, Zap } from "lucide-react";

const advantages = [
  {
    icon: Trophy,
    title: "Premium Quality",
    description:
      "Curated selection of top-rated restaurants and providers. Every meal is prepared with care and excellence.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Quick preparation and speedy delivery. Get your food hot and fresh in record time.",
  },
  {
    icon: Clock,
    title: "Ultimate Convenience",
    description:
      "Order anytime, anywhere. Easy checkout, multiple payment options, and real-time tracking.",
  },
];

export const FoodHubAdvantage = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="foodhub-advantage"
      className="py-16 md:py-24 bg-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeUp}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 text-red-600 rounded-full text-sm font-medium uppercase tracking-wider">
            Our Commitment
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Why We Are The Clear Choice
          </h2>
          <div className="mt-6 h-1 w-24 bg-linear-to-r from-red-600 to-orange-500 mx-auto rounded-full" />
          <p className="text-lg text-muted-foreground mt-8">
            We are committed to providing the ultimate food delivery experience
            with quality, speed, and premium convenience baked into every single
            order.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              className="group relative bg-card rounded-2xl p-8 sm:p-10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 border border-border/50 hover:border-primary/30"
              variants={fadeUp}
              transition={{
                duration: 0.24,
                ease: "easeOut",
                delay: index * 0.06,
              }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-600/10 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:scale-110 transition-all duration-300">
                <advantage.icon className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-red-600 transition-colors">
                {advantage.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {advantage.description}
              </p>

              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full -z-10 group-hover:w-32 group-hover:h-32 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
