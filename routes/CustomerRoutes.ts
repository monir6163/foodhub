import { Route } from "@/types";

export const CustomerRoutes: Route[] = [
  {
    title: "Customer Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        isActive: true,
      },
      {
        title: "My Orders",
        url: "/dashboard/orders",
        isActive: false,
      },
      {
        title: "My Profile",
        url: "/dashboard/profile",
        isActive: false,
      },
      {
        title: "Track Order",
        url: "/dashboard/track",
        isActive: false,
      },
    ],
  },
];
