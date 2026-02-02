import { CheckoutClient } from "@/components/modules/checkout/CheckoutClient";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function CheckoutPage() {
  const { data } = await userService.getSession();

  if (!data?.user) {
    redirect("/login?redirect=/checkout");
  }

  return <CheckoutClient />;
}
