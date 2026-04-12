"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Become a Provider", href: "/become-provider" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "Help Center", href: "/help-center" },
    { name: "Safety", href: "/safety" },
    { name: "Contact", href: "/contact" },
    { name: "FAQs", href: "/faqs" },
  ],
  legal: [
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "https://x.com" },
  { name: "Instagram", href: "https://www.instagram.com" },
  { name: "Facebook", href: "https://www.facebook.com" },
];

export const Footer = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative overflow-hidden border-t border-orange-200/30 bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 text-foreground dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-8 h-56 w-56 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-red-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-amber-300/20 blur-3xl" />
      </div>

      <motion.div
        className="section-container relative py-16 lg:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Brand */}
          <motion.div
            className="lg:col-span-2 rounded-3xl border border-white/60 bg-white/70 p-6 text-center shadow-xl shadow-orange-100/50 backdrop-blur-md sm:text-left dark:border-white/10 dark:bg-white/5 dark:shadow-none"
            variants={fadeUp}
            transition={{ duration: 0.38, ease: "easeOut" }}
          >
            <div className="mb-4 flex items-center justify-center gap-2 sm:justify-start">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/30">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold">FoodHub</span>
            </div>
            <p className="mb-6 max-w-sm text-muted-foreground mx-auto sm:mx-0">
              Your favorite food from the best local restaurants, delivered fast
              to your door. Order now and taste the difference.
            </p>
            <div className="flex gap-4 justify-center sm:justify-start">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-200/70 bg-white/80 text-foreground shadow-sm transition-colors hover:bg-orange-500 hover:text-white dark:border-white/15 dark:bg-white/10"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span className="sr-only">{social.name}</span>
                  <span className="text-sm font-medium">{social.name[0]}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            className="rounded-3xl border border-white/60 bg-white/70 p-6 text-center shadow-xl shadow-orange-100/40 backdrop-blur-md sm:text-left dark:border-white/10 dark:bg-white/5 dark:shadow-none"
            variants={fadeUp}
            transition={{ duration: 0.34, ease: "easeOut" }}
          >
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-muted-foreground transition-all hover:translate-x-1 hover:text-orange-600 dark:hover:text-orange-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-white/60 bg-white/70 p-6 text-center shadow-xl shadow-orange-100/40 backdrop-blur-md sm:text-left dark:border-white/10 dark:bg-white/5 dark:shadow-none"
            variants={fadeUp}
            transition={{ duration: 0.34, ease: "easeOut", delay: 0.03 }}
          >
            <h4 className="mb-4 font-semibold">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-muted-foreground transition-all hover:translate-x-1 hover:text-orange-600 dark:hover:text-orange-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-white/60 bg-white/70 p-6 text-center shadow-xl shadow-orange-100/40 backdrop-blur-md sm:text-left dark:border-white/10 dark:bg-white/5 dark:shadow-none"
            variants={fadeUp}
            transition={{ duration: 0.34, ease: "easeOut", delay: 0.06 }}
          >
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-muted-foreground transition-all hover:translate-x-1 hover:text-orange-600 dark:hover:text-orange-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-orange-200/40 bg-white/60 px-5 py-5 text-center sm:flex-row sm:text-left dark:border-white/10 dark:bg-white/5"
          variants={fadeUp}
          transition={{ duration: 0.34, ease: "easeOut", delay: 0.1 }}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FoodHub. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for food lovers everywhere
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};
