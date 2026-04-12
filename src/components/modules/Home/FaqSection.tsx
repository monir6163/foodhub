"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How long does delivery usually take?",
    answer:
      "Most orders are delivered within 25-40 minutes depending on restaurant preparation time, traffic, and distance.",
  },
  {
    question: "Can I track my order in real time?",
    answer:
      "Yes. Once your order is confirmed, you can follow each step from preparation to delivery directly from the tracking view.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "We support cash on delivery, mobile banking, and major cards. Available options are shown during checkout.",
  },
  {
    question: "How do I become a FoodHub partner?",
    answer:
      "Go to the Become Provider page, submit your business details, and our team will review and onboard your restaurant quickly.",
  },
  {
    question: "What if I receive the wrong order?",
    answer:
      "You can report issues from your orders page. Our support team will verify and resolve it with replacement, refund, or credit.",
  },
];

export const FaqSection = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="faq"
      className="py-16 md:py-24 bg-linear-to-b from-background to-secondary/20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          variants={fadeUp}
          transition={{ duration: 0.26, ease: "easeOut" }}
        >
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">
            Help Center
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-4">
            Everything you need to know about ordering, delivery, and partnering
            with FoodHub.
          </p>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm p-3 sm:p-4 shadow-sm"
          variants={fadeUp}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </motion.section>
  );
};
