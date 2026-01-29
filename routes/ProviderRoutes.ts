import { Route } from "@/types";

export const ProviderRoutes: Route[] = [
  {
    title: "Provider Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        isActive: true,
      },
      {
        title: "Create Blog",
        url: "/dashboard/create-blog",
      },
      {
        title: "History Blogs",
        url: "/dashboard/history-blogs",
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
      },
    ],
  },
];
