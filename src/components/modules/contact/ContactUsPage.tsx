"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Headset, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const contactCards = [
  {
    icon: Mail,
    title: "Email Us",
    value: "support@foodhub.com",
    sub: "We usually reply within a few hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+880 1234-567890",
    sub: "Available daily from 9:00 AM to 11:00 PM",
  },
  {
    icon: MapPin,
    title: "Visit Office",
    value: "Dhaka, Bangladesh",
    sub: "House 21, Road 5, Gulshan",
  },
];

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    toast.success("Message sent successfully. We will contact you soon.");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="bg-background">
      <motion.section
        className="py-20 md:py-28 bg-linear-to-b from-background to-red-600/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">
              <Sparkles className="h-3.5 w-3.5" />
              Contact Us
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Let us talk about your next meal experience
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground">
              Have questions, feedback, or partnership ideas? Our team is here
              to help you quickly.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {contactCards.map((card, index) => (
              <motion.div
                key={card.title}
                className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                variants={fadeUp}
                transition={{
                  duration: 0.24,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-xl bg-red-600/10 flex items-center justify-center mb-4">
                  <card.icon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {card.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{card.sub}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10"
            variants={fadeUp}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center">
                <Headset className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Send us a message
                </h2>
                <p className="text-sm text-muted-foreground">
                  We will get back to you as soon as possible.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-4 sm:gap-5"
            >
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-11"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email address"
                className="h-11"
              />
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="h-11 md:col-span-2"
              />
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message"
                className="min-h-36 md:col-span-2"
              />

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  className="h-11 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </motion.div>

          <motion.div
            className="mt-8 rounded-3xl border border-border/60 bg-card/80 backdrop-blur-sm p-4 sm:p-5"
            variants={fadeUp}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-red-600" />
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                Find us on Google Maps
              </h3>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/60">
              <iframe
                title="FoodHub office location map"
                src="https://www.google.com/maps?q=Gulshan%2C%20Dhaka&output=embed"
                className="w-full h-72 sm:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
