import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const { data } = await userService.getSession();

  if (!data?.user) {
    redirect("/login?redirect=/orders");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="gap-2 mb-8">
          <Link href="/meals">
            <ArrowLeft className="w-4 h-4" />
            Back to Meals
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-4">My Orders</h1>
        <p className="text-muted-foreground">
          Your order history will appear here.
        </p>
      </div>
    </div>
  );
}
