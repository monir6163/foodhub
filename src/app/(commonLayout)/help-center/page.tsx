import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BadgeHelp,
  CreditCard,
  FileSearch,
  Mail,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const supportCategories = [
  {
    title: "Order Tracking",
    description: "Track order progress, live status updates, and delivery ETA.",
    icon: PackageCheck,
  },
  {
    title: "Payments & Refunds",
    description:
      "Get help with payment issues, failed transactions, and refunds.",
    icon: CreditCard,
  },
  {
    title: "Account & Security",
    description:
      "Recover account access, reset credentials, and secure your profile.",
    icon: ShieldCheck,
  },
];

const quickHelp = [
  {
    title: "Contact Support",
    description:
      "For urgent issues, send us your order number and registered email.",
    href: "/contact",
    cta: "Open Contact",
    icon: Mail,
  },
  {
    title: "Read FAQs",
    description:
      "Find instant answers to common delivery, payment, and account questions.",
    href: "/faqs",
    cta: "Go to FAQs",
    icon: FileSearch,
  },
];

export default function HelpCenterPage() {
  return (
    <div className="relative overflow-hidden bg-linear-to-b from-orange-50/70 via-background to-background dark:from-zinc-900/40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-8 h-56 w-56 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-red-300/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-10 rounded-3xl border border-orange-200/40 bg-white/80 p-6 shadow-xl shadow-orange-100/40 backdrop-blur md:p-10 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200/60 bg-orange-100/70 px-3 py-1 text-sm font-medium text-orange-700 dark:border-orange-400/30 dark:bg-orange-500/10 dark:text-orange-300">
            <BadgeHelp className="h-4 w-4" />
            Support Center
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Help Center
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Need help with orders, payments, or your account? We are here for
            you. Get quick answers or connect with our support team for urgent
            assistance.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/faqs">Browse FAQs</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {supportCategories.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="border-border/60 bg-white/80 shadow-lg backdrop-blur dark:bg-white/5"
              >
                <CardHeader className="pb-3">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-red-500 text-white">
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

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {quickHelp.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="border-border/60 bg-white/80 shadow-lg backdrop-blur dark:bg-white/5"
              >
                <CardHeader className="pb-3">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <Button variant="outline" asChild>
                    <Link href={item.href}>{item.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
