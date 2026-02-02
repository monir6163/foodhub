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
      console.log("data my orders", data);
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

  getOrderDetails: async function (orderId: string, cookie: any) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
        },
      });

      if (!res.ok) {
        return {
          data: null,
          message: "Failed to fetch order details",
          status: false,
        };
      }
      const data = await res.json();
      return {
        data: data,
        message: "Order details fetched successfully",
        status: true,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to fetch order details",
        status: false,
      };
    }
  },

  orderStatusTracking: async function (orderId: string, cookie: any) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders/track/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
        },
      });

      const data = await res.json();
      return {
        data: data,
        message: "Order status fetched successfully",
        status: true,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to fetch order status",
        status: false,
      };
    }
  },

  cancelOrder: async function (orderId: string, cookie: any) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders/cancel/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          data: null,
          message: errorData.message || "Failed to cancel order",
          status: false,
        };
      }

      const data = await res.json();
      return {
        data: data,
        message: "Order cancelled successfully",
        status: true,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to cancel order",
        status: false,
      };
    }
  },

  getAllOrdersAdmin: async function (cookie: any) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders/all/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
        },
      });

      if (!res.ok) {
        return {
          data: null,
          message: "Failed to fetch all orders",
          status: false,
        };
      }
      const data = await res.json();
      return {
        data: data,
        message: "All orders fetched successfully",
        status: true,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to fetch all orders",
        status: false,
      };
    }
  },
};
