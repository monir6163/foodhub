import { getAllOrdersAdmin } from "@/actions/orders";
import AllOrdersClient from "@/components/modules/admin/AllOrdersClient";
import { ShoppingBag } from "lucide-react";

export default async function AllOrdersPage() {
  const { data: response } = await getAllOrdersAdmin();
  const orders = response?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <ShoppingBag className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">All Orders</h1>
          <p className="text-muted-foreground">
            Monitor and manage all orders across the platform
          </p>
        </div>
      </div>

      <AllOrdersClient orders={orders} />
    </div>
  );
}
