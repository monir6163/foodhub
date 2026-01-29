import { env } from "@/lib/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();
      if (session === null) {
        return { data: null, message: "No active session", status: false };
      }
      return { data: session, error: null, status: true };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to fetch session data",
        status: false,
      };
    }
  },
};
