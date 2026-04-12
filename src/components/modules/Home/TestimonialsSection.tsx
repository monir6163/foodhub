"use client";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ayesha Rahman",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Ayesha",
    rating: 5,
    review:
      "FoodHub completely changed my weeknights. Fast delivery, fresh food, and always reliable.",
  },
  {
    id: "2",
    name: "Nafis Hossain",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Nafis",
    rating: 5,
    review:
      "The app experience feels premium. My orders arrive hot, and tracking is super accurate.",
  },
  {
    id: "3",
    name: "Sadia Khan",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Sadia",
    rating: 4,
    review:
      "Love the variety of restaurants. Checkout is smooth and support is responsive when needed.",
  },
  {
    id: "4",
    name: "Farhan Ahmed",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Farhan",
    rating: 5,
    review:
      "Great discounts and excellent service. It is now my go-to app for office lunch orders.",
  },
  {
    id: "5",
    name: "Tania Sultana",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Tania",
    rating: 5,
    review:
      "From family dinners to quick snacks, FoodHub consistently delivers quality and speed.",
  },
];

const duplicated = [...testimonials, ...testimonials];

export const TestimonialsSection = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="testimonials"
      className="py-16 md:py-24 bg-linear-to-b from-red-600/5 via-background to-background overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          variants={fadeUp}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 text-red-600 rounded-full text-sm font-semibold uppercase tracking-wider">
            Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Loved by Foodies Across the City
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-5">
            Real feedback from real customers who trust FoodHub every day.
          </p>
        </motion.div>

        <motion.div
          className="relative slider-shell"
          variants={fadeUp}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="pointer-events-none absolute -left-8 top-0 bottom-0 w-16 bg-linear-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute -right-8 top-0 bottom-0 w-16 bg-linear-to-l from-background to-transparent z-10" />

          <div className="testimonial-track flex gap-5 w-max">
            {duplicated.map((item, index) => (
              <motion.article
                key={`${item.id}-${index}`}
                className="group w-70 sm:w-80 lg:w-90 rounded-2xl border border-white/35 bg-white/20 dark:bg-white/10 backdrop-blur-xl p-5 sm:p-6 shadow-[0_12px_45px_-24px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_-26px_rgba(15,23,42,0.72)]"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover border border-white/60 shadow-sm transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-semibold text-foreground leading-tight">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={`w-4 h-4 ${
                              starIndex < item.rating
                                ? "text-amber-500 fill-amber-500"
                                : "text-muted-foreground/40"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Quote className="w-5 h-5 text-red-500/60 transition-transform duration-300 group-hover:-translate-y-0.5" />
                </div>

                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                  {item.review}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .testimonial-track {
          animation: testimonial-slide 42s linear infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-track {
            animation: none;
          }
        }

        .slider-shell:hover .testimonial-track {
          animation-play-state: paused;
        }

        @keyframes testimonial-slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </motion.section>
  );
};
