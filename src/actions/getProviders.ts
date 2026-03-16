"use server";
import { providerService } from "@/services/provider.service";
import { cookies } from "next/headers";
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL as string;
export const providerActions = async () => {
  const res = await providerService.getProviders();
  return res;
};

export const createProviderShop = async (formData: FormData) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${BACKEND_URL}/api/providers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        data: null,
        message: error.message || "Failed to create provider shop",
        status: false,
      };
    }

    const result = await response.json();
    return { data: result, error: null, status: true };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to create provider shop",
      status: false,
    };
  }
};

export const createMealProvider = async (payload: any) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${BACKEND_URL}/api/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        data: null,
        message: error.message || "Failed to create meal",
        status: false,
      };
    }

    const result = await response.json();
    return { data: result, error: null, status: true };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to create meal",
      status: false,
    };
  }
};

export const getProviderMeals = async () => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${BACKEND_URL}/api/meals/provider/meals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        data: null,
        message: error.message || "Failed to fetch provider meals",
        status: false,
      };
    }

    const result = await response.json();
    return { data: result, error: null, status: true };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to fetch provider meals",
      status: false,
    };
  }
};

export const updateMealProvider = async (mealId: string, payload: any) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${BACKEND_URL}/api/meals/${mealId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        data: null,
        message: error.message || "Failed to update meal",
        status: false,
      };
    }

    const result = await response.json();
    return { data: result, error: null, status: true };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to update meal",
      status: false,
    };
  }
};

export const deleteMealProvider = async (mealId: string) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${BACKEND_URL}/api/meals/${mealId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        data: null,
        message: error.message || "Failed to delete meal",
        status: false,
      };
    }

    const result = await response.json();
    return { data: result, error: null, status: true };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to delete meal",
      status: false,
    };
  }
};

export const getMealById = async (mealId: string) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${BACKEND_URL}/api/meals/${mealId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        data: null,
        message: error.message || "Failed to fetch meal",
        status: false,
      };
    }

    const result = await response.json();
    return { data: result, error: null, status: true };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to fetch meal",
      status: false,
    };
  }
};

export const getProviderOrders = async () => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${BACKEND_URL}/api/meals/provider/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        data: null,
        message: error.message || "Failed to fetch provider orders",
        status: false,
      };
    }

    const result = await response.json();
    return { data: result, error: null, status: true };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to fetch provider orders",
      status: false,
    };
  }
};

export const updateOrderStatusProvider = async (
  orderId: string,
  status: string,
) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${BACKEND_URL}/api/meals/orders/${orderId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        data: null,
        message: error.message || "Failed to update order status",
        status: false,
      };
    }

    const result = await response.json();
    return { data: result, error: null, status: true };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to update order status",
      status: false,
    };
  }
};
