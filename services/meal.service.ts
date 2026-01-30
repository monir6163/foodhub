import { env } from "@/lib/env";

const BACKEND_URL = env.BACKEND_URL;

export const mealService = {
  getMeals: async function (params?: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortOrder?: string;
  }) {
    try {
      const queryParams = new URLSearchParams();
      if (params?.limit) queryParams.append("limit", params.limit.toString());
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
      if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

      const url = `${BACKEND_URL}/api/meals${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 300, // Cache for 5 minutes
          tags: ["meals"], // Enable on-demand revalidation
        },
      });

      if (!res.ok) {
        return {
          data: null,
          message: "Failed to fetch meals data",
          status: false,
        };
      }
      const data = await res.json();
      return { data: data, error: null, status: true };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to fetch meals data",
        status: false,
      };
    }
  },

  getMealById: async function (id: string) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/meals/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 300, // Cache for 5 minutes
          tags: ["meals", `meal-${id}`], // Enable specific meal revalidation
        },
      });

      if (!res.ok) {
        return {
          data: null,
          message: "Failed to fetch meal data",
          status: false,
        };
      }
      const data = await res.json();
      return { data: data, error: null, status: true };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to fetch meal data",
        status: false,
      };
    }
  },
};
