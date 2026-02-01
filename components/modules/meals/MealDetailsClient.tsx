"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface MealDetailsClientProps {
  meal: {
    id: string;
    name: string;
    price: number;
    image: string | null;
    isAvailable: boolean;
  };
}

export function MealDetailsClient({ meal }: MealDetailsClientProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const items = useCartStore((state) => state.items);

  const cartItem = items.find((item) => item.id === meal.id);

  const handleAddToCart = () => {
    if (cartItem) {
      // If item already in cart, update quantity
      updateQuantity(meal.id, cartItem.quantity + quantity);
      toast.success(`Updated ${meal.name} quantity in cart!`);
    } else {
      // Add new item to cart with specified quantity
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: meal.id,
          name: meal.name,
          price: meal.price,
          image: meal.image,
          isAvailable: meal.isAvailable,
        });
      }
      toast.success(`${meal.name} (x${quantity}) added to cart!`);
    }
    setQuantity(1); // Reset quantity after adding
  };

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="pt-4 space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold">Quantity:</span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={decrementQuantity}
            disabled={!meal.isAvailable || quantity <= 1}
            className="h-10 w-10"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="w-16 text-center">
            <span className="text-2xl font-bold">{quantity}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={incrementQuantity}
            disabled={!meal.isAvailable || quantity >= 99}
            className="h-10 w-10"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        size="lg"
        className="w-full gap-3 text-lg"
        disabled={!meal.isAvailable}
        onClick={handleAddToCart}
      >
        <ShoppingCart className="w-5 h-5" />
        {meal.isAvailable
          ? `Add to Cart - $${(meal.price * quantity).toFixed(2)}`
          : "Currently Unavailable"}
      </Button>

      {cartItem && (
        <p className="text-sm text-muted-foreground text-center">
          {cartItem.quantity} item(s) already in cart
        </p>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Free delivery on orders over $30
      </p>
    </div>
  );
}
