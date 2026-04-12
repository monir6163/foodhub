"use client";

import {
  ArrowUp,
  ChevronDown,
  Loader2,
  Menu,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { categoryService } from "@/services/category.service";
import { CartButton } from "./CartButton";
import { ModeToggle } from "./ModeToggle";
import { ProfileDropdown } from "./ProfileDropdown";
import { SearchModal } from "./search-form";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Meals", href: "/meals" },
  { name: "Restaurants", href: "/providers" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

interface NavCategory {
  id: string;
  name: string;
  slug?: string;
  _count?: {
    meals?: number;
  };
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [categories, setCategories] = useState<NavCategory[]>([]);
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      const res = await categoryService.getCategories();
      const data = res?.data?.data || [];
      setCategories(Array.isArray(data) ? data.slice(0, 8) : []);
    };

    loadCategories();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg shadow-md border-b"
            : "bg-background border-b"
        }`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          {/* Left - Logo */}
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-xl font-bold text-foreground">FoodHub</span>
          </Link>

          {/* Middle - Nav Items (Desktop) */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems
              .filter((item) => item.name === "Home")
              .map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`transition-colors duration-200 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full ${
                      isActive
                        ? "text-foreground after:w-full"
                        : "text-muted-foreground after:w-0"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

            <div className="relative group pb-3 -mb-3">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 transition-colors duration-200 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-red-600 after:transition-all text-muted-foreground after:w-0 group-hover:after:w-full group-focus-within:after:w-full"
              >
                Categories
                <span className="inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-red-600/10 px-1.5 text-[10px] font-semibold text-red-600">
                  {categories.length || "0"}
                </span>
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
              </button>

              <div className="invisible opacity-0 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-all duration-200 absolute top-full left-1/2 -translate-x-1/2 translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0 w-[560px] rounded-2xl border bg-background/95 backdrop-blur-xl shadow-2xl p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      <Sparkles className="h-3.5 w-3.5 text-red-500" />
                      Popular Categories
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Browse meals by your favorite type
                    </p>
                  </div>
                  <Link
                    href="/meals"
                    className="text-xs font-semibold text-red-600 hover:text-red-500"
                  >
                    View all meals
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/meals?category=${category.slug || category.id}`}
                        className="rounded-xl border border-border/60 px-3 py-2.5 hover:bg-red-600/5 hover:border-red-200 transition-all duration-200"
                      >
                        <p className="text-sm font-medium text-foreground">
                          {category.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {category?._count?.meals || 0} meals
                        </p>
                      </Link>
                    ))
                  ) : (
                    <p className="col-span-2 text-sm text-muted-foreground py-6 text-center">
                      Categories are loading...
                    </p>
                  )}
                </div>
              </div>
            </div>

            {navItems
              .filter((item) => item.name !== "Home")
              .map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`transition-colors duration-200 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full ${
                      isActive
                        ? "text-foreground after:w-full"
                        : "text-muted-foreground after:w-0"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
          </nav>

          {/* Right - Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <CartButton />
            <ModeToggle />
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : session?.user ? (
              <ProfileDropdown user={session?.user} />
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => {
                    setIsSheetOpen(false);
                    setIsSearchOpen(true);
                  }}
                  aria-label="Open search"
                >
                  <Search className="h-5 w-5" />
                </Button>
                <CartButton />
                <ModeToggle />
                <SheetTrigger asChild>
                  <Button variant="secondary" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
              </div>

              <SheetContent side="right" className="w-64">
                <SheetHeader className="hidden">
                  <SheetTitle></SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-6 px-4">
                  {/* Mobile Nav */}
                  <nav className="flex flex-col gap-4">
                    {navItems
                      .filter((item) => item.name === "Home")
                      .map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsSheetOpen(false)}
                            className={`transition-colors duration-200 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full ${
                              isActive
                                ? "text-foreground after:w-full"
                                : "text-muted-foreground after:w-0"
                            }`}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    <Link
                      href="/meals"
                      onClick={() => setIsSheetOpen(false)}
                      className="transition-colors duration-200 text-sm font-medium text-muted-foreground"
                    >
                      Categories
                    </Link>

                    {navItems
                      .filter((item) => item.name !== "Home")
                      .map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsSheetOpen(false)}
                            className={`transition-colors duration-200 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full ${
                              isActive
                                ? "text-foreground after:w-full"
                                : "text-muted-foreground after:w-0"
                            }`}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                  </nav>

                  {/* Mobile Auth Buttons */}
                  <div className="flex flex-col gap-4 mt-4">
                    {isPending ? (
                      <div className="flex items-center justify-center py-2">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                      </div>
                    ) : session?.user ? (
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <ProfileDropdown user={session?.user} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {session.user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => setIsSheetOpen(false)}
                          asChild
                        >
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button
                          variant="default"
                          asChild
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <Link href="/register">Register</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
