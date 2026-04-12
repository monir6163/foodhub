import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeHelp, CircleHelp, FileSearch } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How do I track my order?",
    answer:
      "Go to Dashboard > Orders > Track to see the latest delivery status.",
  },
  {
    question: "Can I cancel an order?",
    answer:
      "Yes, you can cancel before the provider starts preparing your meal.",
  },
  {
    question: "How can I become a provider?",
    answer: "Open the Become a Provider page and submit your shop details.",
  },
  {
    question: "How long does delivery usually take?",
    answer:
      "Delivery time depends on provider distance and traffic, but most orders are delivered within 30-45 minutes.",
  },
  {
    question: "What if my payment fails?",
    answer:
      "Retry with a stable internet connection or use another payment method. If the issue continues, contact support.",
  },
];

export default function FaqsPage() {
  return (
    <div className="relative overflow-hidden bg-linear-to-b from-orange-50/70 via-background to-background dark:from-zinc-900/40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-14 top-10 h-56 w-56 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-red-300/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 rounded-3xl border border-orange-200/40 bg-white/80 p-6 shadow-xl shadow-orange-100/40 backdrop-blur md:p-10 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200/60 bg-orange-100/70 px-3 py-1 text-sm font-medium text-orange-700 dark:border-orange-400/30 dark:bg-orange-500/10 dark:text-orange-300">
            <BadgeHelp className="h-4 w-4" />
            FAQ Hub
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Quick answers to common questions about orders, delivery, payments,
            and provider onboarding.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/contact">Still Need Help?</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/help-center">Open Help Center</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:gap-5">
          {faqs.map((faq) => (
            <Card
              key={faq.question}
              className="border-border/60 bg-white/80 shadow-md backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-white/5"
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-start gap-3 text-xl md:text-2xl">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CircleHelp className="h-4 w-4" />
                  </span>
                  <span>{faq.question}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="pl-11 text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-border/60 bg-white/80 shadow-md backdrop-blur dark:bg-white/5">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileSearch className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">Need a faster response?</h3>
                <p className="text-sm text-muted-foreground">
                  Share your order ID in the contact form so support can assist
                  you quickly.
                </p>
              </div>
            </div>
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
