const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const orderService = {
  createOrder: async function (orderData: {
    providerId: string;
    address: string;
    items: {
      mealId: string;
      quantity: number;
    }[];
  }) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          data: null,
          message: errorData.message || "Failed to create order",
          status: false,
        };
      }
      const data = await res.json();
      return {
        data: data,
        message: "Order created successfully",
        status: true,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to create order",
        status: false,
      };
    }
  },

  getMyOrders: async function (cookie: any) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
        },
      });

      if (!res.ok) {
        return {
          data: null,
          message: "Failed to fetch orders",
          status: false,
        };
      }
      const data = await res.json();
      console.log(data);
      return {
        data: data,
        message: "Orders fetched successfully",
        status: true,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to fetch orders",
        status: false,
      };
    }
  },
};
