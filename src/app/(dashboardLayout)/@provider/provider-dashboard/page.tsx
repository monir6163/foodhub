import { getProviderMeals, getProviderOrders } from "@/actions/getProviders";
import { getProviderReviews } from "@/actions/reviews";
import ProviderDashboardClient from "@/components/modules/providers/ProviderDashboardClient";

export default async function ProviderDashboard() {
  const [{ data: mealsData }, { data: ordersData }, { data: reviewsResponse }] =
    await Promise.all([
      getProviderMeals(),
      getProviderOrders(),
      getProviderReviews(),
    ]);

  const meals = mealsData?.data?.data || [];
  const orders = ordersData?.data?.data || [];
  const reviewsData = reviewsResponse?.data || {
    reviews: [],
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  };
  // Get shop name from meals data (provider info)
  const shopName = meals[0]?.provider?.shopName || "My Shop";

  // Calculate statistics
  const totalMeals = meals.length;
  const availableMeals = meals.filter((meal: any) => meal.isAvailable).length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum: number, order: any) => sum + (order.totalAmount || 0),
    0,
  );

  // Order status breakdown
  const pendingOrders = orders.filter(
    (order: any) => order.status === "PENDING",
  ).length;
  const activeOrders = orders.filter(
    (order: any) =>
      order.status === "ACCEPTED" ||
      order.status === "COOKING" ||
      order.status === "ON_THE_WAY",
  ).length;
  const deliveredOrders = orders.filter(
    (order: any) => order.status === "DELIVERED",
  ).length;
  const cancelledOrders = orders.filter(
    (order: any) => order.status === "CANCELLED",
  ).length;

  // Revenue by order status for pie chart
  const revenueByStatus = [
    {
      name: "Delivered",
      value: orders
        .filter((order: any) => order.status === "DELIVERED")
        .reduce((sum: number, order: any) => sum + order.totalAmount, 0),
      color: "#22c55e",
    },
    {
      name: "Active",
      value: orders
        .filter(
          (order: any) =>
            order.status === "ACCEPTED" ||
            order.status === "COOKING" ||
            order.status === "ON_THE_WAY",
        )
        .reduce((sum: number, order: any) => sum + order.totalAmount, 0),
      color: "#3b82f6",
    },
    {
      name: "Pending",
      value: orders
        .filter((order: any) => order.status === "PENDING")
        .reduce((sum: number, order: any) => sum + order.totalAmount, 0),
      color: "#eab308",
    },
  ].filter((item) => item.value > 0);

  // Recent orders for chart (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split("T")[0];
  });

  const ordersByDay = last7Days.map((date) => {
    const dayOrders = orders.filter(
      (order: any) => order.createdAt.split("T")[0] === date,
    );
    return {
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      orders: dayOrders.length,
      revenue: dayOrders.reduce(
        (sum: number, order: any) => sum + order.totalAmount,
        0,
      ),
    };
  });

  // Top selling meals
  const mealSales = orders.reduce((acc: any, order: any) => {
    order.items?.forEach((item: any) => {
      const mealId = item.mealId;
      if (!acc[mealId]) {
        acc[mealId] = {
          name: item.meal?.name || "Unknown",
          quantity: 0,
          revenue: 0,
        };
      }
      acc[mealId].quantity += item.quantity;
      acc[mealId].revenue += item.price * item.quantity;
    });
    return acc;
  }, {});

  const topMeals = Object.values(mealSales)
    .sort((a: any, b: any) => b.revenue - a.revenue)
    .slice(0, 5) as Array<{ name: string; quantity: number; revenue: number }>;

  // Prepare data for client component
  const stats = {
    totalMeals,
    availableMeals,
    totalOrders,
    totalRevenue,
    pendingOrders,
    activeOrders,
    deliveredOrders,
    cancelledOrders,
  };

  return (
    <ProviderDashboardClient
      shopName={shopName}
      stats={stats}
      revenueByStatus={revenueByStatus}
      ordersByDay={ordersByDay}
      topMeals={topMeals}
      reviewsData={reviewsData}
    />
  );
}
