const footerLinks = {
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Press", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Safety", href: "#" },
    { name: "Contact", href: "#" },
    { name: "FAQs", href: "#" },
  ],
  legal: [
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 text-secondary-foreground border-t border-background/10 shadow-inner">
      <div className="section-container py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 text-center sm:text-left">
            <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold text-foreground">FoodHub</span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6 mx-auto sm:mx-0">
              Your favorite food from the best local restaurants, delivered fast
              to your door. Order now and taste the difference.
            </p>
            <div className="flex gap-4 justify-center sm:justify-start">
              {["Twitter", "Instagram", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-foreground"
                >
                  <span className="sr-only">{social}</span>
                  <span className="text-sm font-medium">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4 text-foreground">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FoodHub. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for food lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};
