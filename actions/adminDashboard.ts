"use server";

import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const getAdminDashboardStats = async () => {
  try {
    const cookieStore = await cookies();

    // Get all users
    const usersRes = await fetch(`${BACKEND_URL}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    // Get all orders
    const ordersRes = await fetch(`${BACKEND_URL}/api/orders/all/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    // Get all categories
    const categoriesRes = await fetch(`${BACKEND_URL}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const users = usersRes.ok ? await usersRes.json() : { data: [] };
    const orders = ordersRes.ok ? await ordersRes.json() : { data: [] };
    const categories = categoriesRes.ok
      ? await categoriesRes.json()
      : { data: [] };

    return {
      users: users.data || [],
      orders: orders.data || [],
      categories: categories.data || [],
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      users: [],
      orders: [],
      categories: [],
      status: false,
    };
  }
};
