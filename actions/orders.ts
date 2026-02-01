import { orderService } from "@/services/order.service";
import { cookies } from "next/headers";

export const orderActions = async () => {
  const cookieStore = await cookies();
  const res = await orderService.getMyOrders(cookieStore.toString());
  console.log(res);
  return res;
};
