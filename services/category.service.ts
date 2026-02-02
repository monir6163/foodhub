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

  createCategory: async function (name: string, cookie: any) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          data: null,
          message: errorData.message || "Failed to create category",
          status: false,
        };
      }
      const data = await res.json();
      return {
        data: data,
        message: "Category created successfully",
        status: true,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to create category",
        status: false,
      };
    }
  },

  updateCategory: async function (id: string, name: string, cookie: any) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          data: null,
          message: errorData.message || "Failed to update category",
          status: false,
        };
      }
      const data = await res.json();
      return {
        data: data,
        message: "Category updated successfully",
        status: true,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to update category",
        status: false,
      };
    }
  },

  deleteCategory: async function (id: string, cookie: any) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          data: null,
          message: errorData.message || "Failed to delete category",
          status: false,
        };
      }
      const data = await res.json();
      return {
        data: data,
        message: "Category deleted successfully",
        status: true,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to delete category",
        status: false,
      };
    }
  },
};
