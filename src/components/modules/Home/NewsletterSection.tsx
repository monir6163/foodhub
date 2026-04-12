"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    toast.success(
      "Subscribed successfully. You’ll receive offers and updates.",
    );
    setEmail("");
  };

  return (
    <motion.section
      id="newsletter"
      className="py-16 md:py-24 bg-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 sm:p-8 md:p-10 shadow-xl"
          variants={fadeUp}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-red-500/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">
                <Sparkles className="h-3.5 w-3.5" />
                Offers & Updates
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
                Stay updated with FoodHub deals
              </h2>
              <p className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground">
                Subscribe to get exclusive offers, fresh promotions, and app
                updates directly in your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <div className="space-y-4 rounded-2xl border border-border/70 bg-background/80 p-4 sm:p-5 backdrop-blur-sm shadow-sm">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 rounded-xl pl-10 bg-background/90"
                  />
                </div>

                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-red-600 text-white hover:bg-red-500 shadow-md transition-all duration-200"
                  >
                    Subscribe
                  </Button>
                </motion.div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
