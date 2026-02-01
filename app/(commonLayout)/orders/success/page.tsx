"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import confetti from "canvas-confetti";
import { CheckCircle, Home, Package } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function OrderSuccessPage() {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-12 pb-8 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>
            <p className="text-muted-foreground">
              Thank you for your order. We'll deliver it to you soon.
            </p>
          </div>

          <div className="bg-muted rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm">
              <Package className="w-4 h-4 text-primary" />
              <span className="font-medium">Your order is being prepared</span>
            </div>
            <p className="text-xs text-muted-foreground">
              You'll receive a confirmation call shortly
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button asChild size="lg" className="w-full">
              <Link href="/meals">
                <Home className="w-5 h-5 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/orders">
                <Package className="w-5 h-5 mr-2" />
                View Orders
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
