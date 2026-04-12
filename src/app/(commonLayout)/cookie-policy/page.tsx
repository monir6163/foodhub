import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cookie, Settings2, ShieldCheck } from "lucide-react";
import Link from "next/link";

const cookieSections = [
  {
    title: "Why We Use Cookies",
    description:
      "FoodHub uses cookies to keep you signed in, remember your preferences, and improve site performance.",
    icon: Cookie,
  },
  {
    title: "Essential Cookies",
    description:
      "Essential cookies are required for login sessions, secure checkout flow, and core platform functionality.",
    icon: ShieldCheck,
  },
  {
    title: "Your Cookie Controls",
    description:
      "You can manage non-essential cookie preferences through your browser settings and privacy tools.",
    icon: Settings2,
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="relative overflow-hidden bg-linear-to-b from-orange-50/70 via-background to-background dark:from-zinc-900/40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-14 top-8 h-56 w-56 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-red-300/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 rounded-3xl border border-orange-200/40 bg-white/80 p-6 shadow-xl shadow-orange-100/40 backdrop-blur md:p-10 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200/60 bg-orange-100/70 px-3 py-1 text-sm font-medium text-orange-700 dark:border-orange-400/30 dark:bg-orange-500/10 dark:text-orange-300">
            <Cookie className="h-4 w-4" />
            Legal & Privacy
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Cookie Policy
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            This policy explains how FoodHub uses cookies and similar
            technologies to enhance user experience, keep your account secure,
            and improve service quality.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cookieSections.map((item) => {
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
              <h3 className="font-semibold">Need more privacy information?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Review our full privacy policy or contact support for policy
                related questions.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" asChild>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </Button>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
