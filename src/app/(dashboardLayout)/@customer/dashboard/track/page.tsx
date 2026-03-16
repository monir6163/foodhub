"use client";

import { orderStatusTracking } from "@/actions/orders";
import { OrderStatusTracking } from "@/components/modules/customer/OrderStatusTracking";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Package, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setOrderData(null);

    try {
      const res = await orderStatusTracking(orderId.trim());
      if (res?.data?.success) {
        setOrderData({ ...res.data?.data, orderNumber: orderId.trim() });
        toast.success("Order found");
      } else {
        toast.error(res?.data?.message || "Order not found");
      }
    } catch (err) {
      toast.error("Order not found");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setOrderId("");
    setOrderData(null);
    setError("");
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Track Your Order</h1>
        <p className="text-muted-foreground mt-2">
          Enter your order ID to see real-time tracking information
        </p>
      </div>

      {/* Search Card */}
      <Card>
        <CardHeader>
          <CardTitle>Enter Order ID</CardTitle>
          <CardDescription>
            You can find your order ID in your order confirmation email or order
            history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTrackOrder} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orderId">Order ID</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="orderId"
                    type="text"
                    placeholder="Enter your order ID (e.g., ABC12345 or full UUID)"
                    value={orderId}
                    onChange={(e) => {
                      setOrderId(e.target.value);
                      setError("");
                    }}
                    disabled={isLoading}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" disabled={isLoading || !orderId.trim()}>
                  {isLoading ? "Searching..." : "Track Order"}
                </Button>
                {orderData && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    disabled={isLoading}
                  >
                    Reset
                  </Button>
                )}
              </div>
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Order Tracking Result */}
      {orderData && <OrderStatusTracking order={orderData} />}

      {/* Help Section */}
      {!orderData && !error && (
        <Card className="bg-muted/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Need Help?</CardTitle>
                <CardDescription>
                  Having trouble tracking your order?
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <h4 className="font-semibold">How to find your Order ID:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>Check your order confirmation email</li>
                <li>Visit your order history page</li>
                <li>Look for the 8-character code (e.g., ABC12345)</li>
                <li>You can also use the full order UUID</li>
              </ul>
            </div>

            <div className="space-y-2 text-sm">
              <h4 className="font-semibold">Order Status Stages:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>
                  <strong>Pending:</strong> Order received and awaiting
                  confirmation
                </li>
                <li>
                  <strong>Accepted:</strong> Provider confirmed your order
                </li>
                <li>
                  <strong>Cooking:</strong> Your meal is being prepared
                </li>
                <li>
                  <strong>On the Way:</strong> Order is out for delivery
                </li>
                <li>
                  <strong>Delivered:</strong> Order successfully delivered
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
