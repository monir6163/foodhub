import { orderActions } from "@/actions/orders";
import { MyOrders } from "@/components/modules/customer/myOrders";
import { ShoppingBag } from "lucide-react";

export default async function CustomerOrdersPage() {
  const ordersData = await orderActions();
  const orders = ordersData?.data?.data || [];
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <ShoppingBag className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your order history
          </p>
        </div>
      </div>

      <MyOrders orders={orders} />
    </div>
  );
}
