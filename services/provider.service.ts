import { env } from "@/lib/env";

const BACKEND_URL = env.BACKEND_URL;
export const providerService = {
  getProviders: async function () {
    try {
      const res = await fetch(`${BACKEND_URL}/api/providers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        return {
          data: null,
          message: "Failed to fetch provider data",
          status: false,
        };
      }
      const data = await res.json();
      return { data: data, error: null, status: true };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to fetch provider data",
        status: false,
      };
    }
  },
};
