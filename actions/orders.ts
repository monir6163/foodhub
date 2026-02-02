"use server";
import { orderService } from "@/services/order.service";
import { cookies } from "next/headers";

export const orderActions = async () => {
  const cookieStore = await cookies();
  const res = await orderService.getMyOrders(cookieStore.toString());
  return res;
};

export const orderStatusTracking = async (orderId: string) => {
  const cookieStore = await cookies();
  const res = await orderService.orderStatusTracking(
    orderId,
    cookieStore.toString(),
  );
  return res;
};

export const getOrderDetails = async (orderId: string) => {
  const cookieStore = await cookies();
  const res = await orderService.getOrderDetails(
    orderId,
    cookieStore.toString(),
  );
  return res;
};

export const cancelOrder = async (orderId: string) => {
  const cookieStore = await cookies();
  const res = await orderService.cancelOrder(orderId, cookieStore.toString());
  return res;
};

export const getAllOrdersAdmin = async () => {
  const cookieStore = await cookies();
  const res = await orderService.getAllOrdersAdmin(cookieStore.toString());
  return res;
};
