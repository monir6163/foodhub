"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";

const navItems = [
  { name: "Home", href: "#" },
  { name: "Restaurants", href: "#providers" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Orders", href: "#tracking" },
];

export default function Navbar() {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left - Logo */}
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <span className="text-xl font-bold text-foreground">FoodHub</span>
        </Link>

        {/* Middle - Nav Items (Desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium dark:text-gray-100 text-gray-700 hover:border-gray-300 hover:text-foreground block px-3 py-2 rounded-md hover:border-b transition ease-in-out duration-150"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right - Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <ModeToggle />
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              <SheetHeader className="hidden">
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-6 px-4">
                {/* Mobile Nav */}
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium dark:text-gray-100 text-gray-700 hover:border-gray-300 hover:text-foreground block px-3 py-2 rounded-md hover:underline transition ease-in-out duration-150"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col gap-3">
                  <Button variant="outline" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
