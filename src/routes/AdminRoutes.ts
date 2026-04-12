import { Route } from "@/types";

export const AdminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/admin-dashboard",
        isActive: true,
        icon: "layout-dashboard",
      },
      {
        title: "Categories",
        url: "/admin-dashboard/all-categories",
        icon: "tags",
      },
      {
        title: "All Users",
        url: "/admin-dashboard/all-users",
        icon: "users",
      },
      {
        title: "All Orders",
        url: "/admin-dashboard/all-orders",
        icon: "list-ordered",
      },
      {
        title: "Blog Posts (AI)",
        url: "/admin-dashboard/blog-posts",
        icon: "wand-sparkles",
      },
      {
        title: "All Blogs",
        url: "/admin-dashboard/all-blogs",
        icon: "book-text",
      },
    ],
  },
];
