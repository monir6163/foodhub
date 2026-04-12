import { Button } from "@/components/ui/button";
import { CheckCircle2, Store, Users, Wallet } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: Users,
    label: "More customers",
  },
  {
    icon: Store,
    label: "Easy management",
  },
  {
    icon: Wallet,
    label: "Fast payouts",
  },
];

export const BecomeProviderSection = () => {
  return (
    <section
      id="become-provider-section"
      className="py-16 md:py-24 bg-linear-to-b from-background to-red-600/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 text-red-600 rounded-full text-sm font-semibold uppercase tracking-wider">
              Partner Program
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 leading-tight">
              Grow Your Restaurant Business With Us
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground mt-5 max-w-xl">
              Join our growing marketplace and turn every meal into more reach,
              better operations, and reliable earnings.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li
                  key={benefit.label}
                  className="group flex items-center gap-3 rounded-xl px-2 py-1 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600/5"
                >
                  <span className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <benefit.icon className="w-5 h-5 text-red-600" />
                  </span>
                  <span className="text-foreground font-semibold text-base sm:text-lg">
                    {benefit.label}
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto transition-transform duration-300 group-hover:scale-110" />
                </li>
              ))}
            </ul>

            <Link href="/become-provider" className="inline-block mt-9">
              <Button
                className="group relative overflow-hidden h-12 px-8 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-base transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_35px_-10px_rgba(220,38,38,0.8)] active:translate-y-0 active:scale-[0.98]"
                type="button"
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full" />
                <span className="relative">Join as Partner</span>
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl border border-red-200/60 bg-card p-8 sm:p-10 shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-red-500/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-orange-400/20 rounded-full blur-3xl" />

              <div className="relative space-y-5">
                <div className="rounded-2xl bg-background/90 border border-border p-4 sm:p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <p className="text-sm text-muted-foreground">
                    Orders this week
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
                    +248
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-red-600 text-white p-4 sm:p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    <p className="text-xs uppercase tracking-wider text-white/80">
                      Revenue
                    </p>
                    <p className="text-xl sm:text-2xl font-bold mt-1">৳42K</p>
                  </div>
                  <div className="rounded-2xl bg-foreground text-background p-4 sm:p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    <p className="text-xs uppercase tracking-wider text-background/80">
                      Payout
                    </p>
                    <p className="text-xl sm:text-2xl font-bold mt-1">24h</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-background/90 border border-border p-4 sm:p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <p className="text-sm text-muted-foreground">
                    Partner Rating
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                    4.9 / 5.0
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
