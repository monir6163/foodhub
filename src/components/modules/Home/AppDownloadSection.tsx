"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Apple, Download, PlayCircle, Smartphone } from "lucide-react";

export const AppDownloadSection = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="app-download"
      className="py-16 md:py-24 bg-linear-to-b from-background to-red-600/5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">
              Mobile App
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Download our app
            </h2>

            <p className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground">
              Order faster, track delivery live, and get exclusive app-only
              offers on iOS and Android.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Button className="h-12 rounded-xl px-5 bg-foreground text-background hover:bg-foreground/90 shadow-md transition-all duration-200">
                  <Apple className="mr-2 h-5 w-5" />
                  App Store
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Button
                  variant="outline"
                  className="h-12 rounded-xl px-5 border-border/80 bg-card/80 backdrop-blur-sm hover:bg-card shadow-sm transition-all duration-200"
                >
                  <PlayCircle className="mr-2 h-5 w-5 text-primary" />
                  Google Play
                </Button>
              </motion.div>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3 py-2">
                <Download className="h-4 w-4 text-primary" />
                Fast download
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3 py-2">
                <Smartphone className="h-4 w-4 text-primary" />
                Mobile friendly
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            variants={fadeUp}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="relative mx-auto max-w-md rounded-[2rem] border border-red-200/60 bg-card p-5 shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-30px_rgba(220,38,38,0.55)]"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-red-500/15 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-orange-400/20 blur-3xl" />

              <div className="relative rounded-[1.5rem] bg-linear-to-b from-foreground via-foreground/95 to-zinc-950 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                      FoodHub App
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">
                      Always in your pocket
                    </h3>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                    <Smartphone className="h-7 w-7 text-white" />
                  </div>
                </div>

                <div className="mt-8 grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                    <p className="text-sm text-white/70">Live tracking</p>
                    <p className="mt-1 text-lg font-semibold">
                      Know exactly where your food is
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                    <p className="text-sm text-white/70">Exclusive offers</p>
                    <p className="mt-1 text-lg font-semibold">
                      Unlock app-only discounts and updates
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
