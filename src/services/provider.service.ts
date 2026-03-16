const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL as string;
export const providerService = {
  getProviders: async function () {
    try {
      const res = await fetch(`${BACKEND_URL}/api/providers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
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

  getProviderById: async function (id: string) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/providers/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        return {
          data: null,
          message: "Failed to fetch provider details",
          status: false,
        };
      }
      const data = await res.json();
      return { data: data, error: null, status: true };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to fetch provider details",
        status: false,
      };
    }
  },
};
