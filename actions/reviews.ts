"use server";

import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface CreateReviewData {
  mealId: string;
  rating: number;
  comment?: string;
}

export const createReview = async (data: CreateReviewData) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${BACKEND_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        data: null,
        message: error.message || "Failed to create review",
        status: false,
      };
    }

    const result = await response.json();
    return {
      data: result,
      message: "Review submitted successfully",
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to create review",
      status: false,
    };
  }
};

export const getMealReviews = async (mealId: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/reviews/meal/${mealId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        data: null,
        message: error.message || "Failed to fetch reviews",
        status: false,
      };
    }

    const result = await response.json();
    return {
      data: result,
      message: "Reviews fetched successfully",
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to fetch reviews",
      status: false,
    };
  }
};

export const getUserReviews = async () => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${BACKEND_URL}/api/reviews/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        data: null,
        message: error.message || "Failed to fetch user reviews",
        status: false,
      };
    }

    const result = await response.json();
    return {
      data: result,
      message: "User reviews fetched successfully",
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to fetch user reviews",
      status: false,
    };
  }
};

export const getProviderReviews = async () => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${BACKEND_URL}/api/reviews/provider`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        data: null,
        message: error.message || "Failed to fetch provider reviews",
        status: false,
      };
    }

    const result = await response.json();
    return {
      data: result,
      message: "Provider reviews fetched successfully",
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to fetch provider reviews",
      status: false,
    };
  }
};

export const getPopularMeals = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/meals/popular/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        data: null,
        message: error.message || "Failed to fetch popular meals",
        status: false,
      };
    }

    const result = await response.json();
    return {
      data: result,
      message: "Popular meals fetched successfully",
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to fetch popular meals",
      status: false,
    };
  }
};
