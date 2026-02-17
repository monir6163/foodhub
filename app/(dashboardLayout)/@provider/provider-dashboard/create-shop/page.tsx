import { getProviderMeals } from "@/actions/getProviders";
import { CreateShopForm } from "@/components/modules/providers/CreateShopForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  Package,
  Store,
} from "lucide-react";
import Link from "next/link";

export default async function page() {
  const { data: providers } = await getProviderMeals();
  const alreadyHasShop = providers?.data?.data[0]?.provider || null;

  if (alreadyHasShop) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-2 shadow-lg">
          <CardHeader className="text-center space-y-3 pb-8">
            <div className="mx-auto w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-500" />
            </div>
            <CardTitle className="text-3xl font-bold">
              Shop Already Created!
            </CardTitle>
            <CardDescription className="text-lg">
              Your shop is ready and active
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-6 border border-border">
              <div className="flex items-center gap-3 mb-2">
                <Store className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Shop Name
                </span>
              </div>
              <h4 className="text-2xl font-bold text-foreground">
                {alreadyHasShop?.shopName}
              </h4>
            </div>

            <div className="space-y-3">
              <p className="text-center text-muted-foreground">
                Manage your shop and continue growing your business
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <Button asChild size="lg" className="w-full group">
                  <Link href="/provider-dashboard">
                    <LayoutDashboard className="w-5 h-5 mr-2" />
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full group"
                >
                  <Link href="/provider-dashboard/meals">
                    <Package className="w-5 h-5 mr-2" />
                    Manage Meals
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Store className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Create Your Shop
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Set up your shop and start selling delicious meals to hungry
            customers
          </p>
        </div>
        <CreateShopForm />
      </div>
    </div>
  );
}
