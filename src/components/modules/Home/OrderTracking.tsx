"use client";

import { motion } from "framer-motion";
import { Bell, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Live Updates",
    description: "Track your order in real-time on the map",
  },
  {
    icon: ShieldCheck,
    title: "Verified Providers",
    description: "All restaurants are quality-checked",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "Get alerts at every step of the way",
  },
];

const trackingSteps = [
  { label: "Order Confirmed", time: "10:30 AM", completed: true },
  { label: "Preparing", time: "10:35 AM", completed: true },
  { label: "Out for Delivery", time: "10:50 AM", completed: true },
  { label: "Delivered", time: "Est. 11:05 AM", completed: false },
];

export const OrderTracking = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="tracking"
      className=" bg-red-600/5 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
              Real-Time Tracking
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Know Where Your Food Is, Always
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Never wonder about your order again. Our live tracking system
              keeps you informed from the moment you order until it arrives at
              your door.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex flex-col gap-2"
                  variants={fadeUp}
                  transition={{
                    duration: 0.24,
                    ease: "easeOut",
                    delay: index * 0.05,
                  }}
                  whileHover={{ y: -3 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-red-600/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-red-600-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual - Order Tracking Card */}
          <motion.div
            className="relative"
            variants={fadeUp}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="bg-card rounded-3xl p-6 sm:p-8 shadow-xl border border-border"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Order #FH2847</p>
                  <p className="font-semibold text-foreground">Burger Palace</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  On the way
                </span>
              </div>

              {/* Timeline */}
              <div className="space-y-0">
                {trackingSteps.map((step, index) => (
                  <div key={step.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed
                            ? "bg-red-600 text-red-600-foreground"
                            : "bg-muted-foreground/30 text-muted-foreground"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 color="#fff" className="w-5 h-5" />
                        ) : (
                          <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                        )}
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-12 ${
                            step.completed ? "bg-red-600" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                    <div className="pb-10">
                      <p
                        className={`font-medium ${
                          step.completed
                            ? "text-red-600-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {step.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div
                className="h-32 
              bg-linear-to-radial from-red-600/10 to-transparent border border-border
              rounded-2xl flex items-center justify-center mt-4"
              >
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Live map view</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-red-600/5 rounded-3xl" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
