"use server";

import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const getAllUsers = async () => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${BACKEND_URL}/api/users`, {
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
        message: error.message || "Failed to fetch users",
        status: false,
      };
    }

    const result = await response.json();
    return {
      data: result,
      message: "Users fetched successfully",
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to fetch users",
      status: false,
    };
  }
};
