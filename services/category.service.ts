import { env } from "@/lib/env";

const BACKEND_URL = env.BACKEND_URL;
export const categoryService = {
  getCategories: async function () {
    try {
      const res = await fetch(`${BACKEND_URL}/api/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 600, // Cache for 10 minutes (categories change less frequently)
          tags: ["categories"], // Enable on-demand revalidation
        },
      });

      if (!res.ok) {
        return {
          data: null,
          message: "Failed to fetch category data",
          status: false,
        };
      }
      const data = await res.json();
      return { data: data, error: null, status: true };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to fetch category data",
        status: false,
      };
    }
  },
};
