import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck2, Scale, ShieldAlert } from "lucide-react";
import Link from "next/link";

const termsSections = [
  {
    title: "Acceptance of Terms",
    description:
      "By using FoodHub, you agree to follow these terms and use the platform responsibly.",
    icon: FileCheck2,
  },
  {
    title: "Service Availability",
    description:
      "Order availability, delivery windows, and provider capacity may vary by location, time, and demand.",
    icon: Scale,
  },
  {
    title: "Policy Updates",
    description:
      "FoodHub may update these terms when necessary. Major changes will be reflected through platform notices.",
    icon: ShieldAlert,
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="relative overflow-hidden bg-linear-to-b from-orange-50/70 via-background to-background dark:from-zinc-900/40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-8 h-56 w-56 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-red-300/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 rounded-3xl border border-orange-200/40 bg-white/80 p-6 shadow-xl shadow-orange-100/40 backdrop-blur md:p-10 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            These terms define how FoodHub services can be used and what users
            can expect while ordering from providers.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {termsSections.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="border-border/60 bg-white/80 shadow-md backdrop-blur dark:bg-white/5"
              >
                <CardHeader className="pb-3">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 border-border/60 bg-white/80 shadow-md backdrop-blur dark:bg-white/5">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold">Need legal clarification?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Our support team can help explain policy terms and usage rules.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" asChild>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </Button>
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
