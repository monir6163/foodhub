import { CartClient } from "@/components/modules/cart/CartClient";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const { data } = await userService.getSession();

  if (!data?.user) {
    redirect("/login?redirect=/cart");
  }

  return <CartClient />;
}
