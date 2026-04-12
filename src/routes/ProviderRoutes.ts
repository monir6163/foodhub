import { Route } from "@/types";

export const ProviderRoutes: Route[] = [
  {
    title: "Provider Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/provider-dashboard",
        icon: "layout-dashboard",
      },
      {
        title: "Create Shop",
        url: "/provider-dashboard/create-shop",
        icon: "store",
      },
      {
        title: "Meals",
        url: "/provider-dashboard/meals",
        icon: "utensils-crossed",
      },
      {
        title: "My Orders",
        url: "/provider-dashboard/my-orders",
        icon: "shopping-bag",
      },
    ],
  },
];
