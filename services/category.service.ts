const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL as string;
export const categoryService = {
  getCategories: async function () {
    try {
      const res = await fetch(`${BACKEND_URL}/api/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          // Revalidate every 1 minute
          revalidate: 60,
          tags: ["categories"],
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
      console.log(data);
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
