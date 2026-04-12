"use server";

import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL as string;

type BlogQuery = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "title" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
};

export const generateBlogPost = async (topic: string) => {
  try {
    const finalTopic = topic?.trim();
    if (!finalTopic) {
      return {
        data: null,
        message: "Topic is required",
        status: false,
      };
    }

    const cookieStore = await cookies();
    const response = await fetch(`${BACKEND_URL}/api/ai/blog-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ topic: finalTopic }),
      cache: "no-store",
    });

    const payload = await response.json();

    if (!response.ok || !payload?.success) {
      return {
        data: null,
        message: payload?.message || "Failed to generate blog post",
        status: false,
      };
    }

    return {
      data: payload?.data || null,
      message: payload?.message || "Blog post generated and saved successfully",
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to generate blog post",
      status: false,
    };
  }
};

export const getAllBlogs = async (query?: BlogQuery) => {
  try {
    const cookieStore = await cookies();
    const searchParams = new URLSearchParams();

    if (query?.page) searchParams.append("page", String(query.page));
    if (query?.limit) searchParams.append("limit", String(query.limit));
    if (query?.search) searchParams.append("search", query.search);
    if (query?.sortBy) searchParams.append("sortBy", query.sortBy);
    if (query?.sortOrder) searchParams.append("sortOrder", query.sortOrder);

    const url = `${BACKEND_URL}/api/blogs${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    const response = await fetch(url, {
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
        data: [],
        meta: null,
        message: error?.message || "Failed to fetch blogs",
        status: false,
      };
    }

    const result = await response.json();
    return {
      data: result?.data || [],
      meta: result?.meta || null,
      message: result?.message || "Blogs fetched successfully",
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      meta: null,
      message: "Failed to fetch blogs",
      status: false,
    };
  }
};

export const getPublicBlogs = async (query?: BlogQuery) => {
  try {
    const searchParams = new URLSearchParams();

    if (query?.page) searchParams.append("page", String(query.page));
    if (query?.limit) searchParams.append("limit", String(query.limit));
    if (query?.search) searchParams.append("search", query.search);
    if (query?.sortBy) searchParams.append("sortBy", query.sortBy);
    if (query?.sortOrder) searchParams.append("sortOrder", query.sortOrder);

    const url = `${BACKEND_URL}/api/blogs${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        data: [],
        meta: null,
        message: error?.message || "Failed to fetch blogs",
        status: false,
      };
    }

    const result = await response.json();
    return {
      data: result?.data || [],
      meta: result?.meta || null,
      message: result?.message || "Blogs fetched successfully",
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      meta: null,
      message: "Failed to fetch blogs",
      status: false,
    };
  }
};

export const getBlogBySlug = async (slug: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/blogs/${slug}`, {
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
        message: error?.message || "Failed to fetch blog",
        status: false,
      };
    }

    const result = await response.json();
    return {
      data: result?.data || null,
      message: result?.message || "Blog fetched successfully",
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Failed to fetch blog",
      status: false,
    };
  }
};
