import { Search, ShoppingBag, Truck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Providers",
    description:
      "Explore hundreds of restaurants and food providers near you. Filter by cuisine, rating, or delivery time.",
  },
  {
    icon: ShoppingBag,
    title: "Place Your Order",
    description:
      "Add your favorite meals to cart and checkout securely. Multiple payment options available.",
  },
  {
    icon: Truck,
    title: "Track Delivery",
    description:
      "Watch your order in real-time as it makes its way to your doorstep. Get live updates.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-secondary/30">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting your favorite food delivered has never been easier. Just
            three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative bg-card rounded-3xl p-8 transition-all duration-300 hover:shadow-(--card-shadow-hover) hover:-translate-y-1"
            >
              {/* Step number */}
              <span className="absolute top-6 right-6 text-6xl font-bold text-muted-foreground/10 pointer-events-none">
                {index + 1}
              </span>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:scale-110 transition-all duration-300">
                <step.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
