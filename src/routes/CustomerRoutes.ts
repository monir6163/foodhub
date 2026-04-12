import { Route } from "@/types";

export const CustomerRoutes: Route[] = [
  {
    title: "Customer Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: "layout-dashboard",
      },
      {
        title: "My Orders",
        url: "/dashboard/orders",
        icon: "package-search",
      },
      {
        title: "My Profile",
        url: "/dashboard/profile",
        icon: "user",
      },
      {
        title: "Track Order",
        url: "/dashboard/track",
        icon: "map-pinned",
      },
    ],
  },
];
