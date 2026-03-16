import { MealServiceType } from "@/types/meal.type";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const mealService = {
  getMeals: async function (params?: MealServiceType) {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.limit) queryParams.append("limit", params.limit.toString());
      if (params?.search) queryParams.append("search", params.search);
      if (params?.category) queryParams.append("category", params.category);
      if (params?.cuisine) queryParams.append("cuisine", params.cuisine);
      if (params?.dietary) queryParams.append("dietary", params.dietary);
      if (params?.mealType) queryParams.append("mealType", params.mealType);
      if (params?.spiceLevel)
        queryParams.append("spiceLevel", params.spiceLevel);
      if (params?.minPrice)
        queryParams.append("minPrice", params.minPrice.toString());
      if (params?.maxPrice)
        queryParams.append("maxPrice", params.maxPrice.toString());
      if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
      if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);
      const url = `${BACKEND_URL}/api/meals${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
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
      });

      if (!res.ok) {
        return {
          data: null,
          message: "Failed to fetch meal details",
          status: false,
        };
      }
      const data = await res.json();
      return { data: data, error: null, status: true };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to fetch meal details",
        status: false,
      };
    }
  },

  getMealTypes: async function () {
    try {
      const res = await fetch(`${BACKEND_URL}/api/meals/types/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: [], status: false };
      }
      const data = await res.json();
      return { data: data.data || [], status: true };
    } catch (error) {
      console.log(error);
      return { data: [], status: false };
    }
  },

  getDietaryOptions: async function () {
    try {
      const res = await fetch(`${BACKEND_URL}/api/meals/dietary-options/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: [], status: false };
      }
      const data = await res.json();
      return { data: data.data || [], status: true };
    } catch (error) {
      console.log(error);
      return { data: [], status: false };
    }
  },

  getCuisineOptions: async function () {
    try {
      const res = await fetch(`${BACKEND_URL}/api/meals/cuisine-options/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: [], status: false };
      }
      const data = await res.json();
      return { data: data.data || [], status: true };
    } catch (error) {
      console.log(error);
      return { data: [], status: false };
    }
  },
};
