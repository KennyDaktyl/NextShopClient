"use server";

import axiosInstance from "@/axios";
import { redirect } from "next/navigation";

interface GetProductsByCategoryParams {
	searchParams: {
		page: string;
	};
	categorySlug: string;
}

export async function getProductsByCategory({
	categorySlug,
	searchParams,
}: GetProductsByCategoryParams): Promise<GetProductsResponse> {
	try {
		const url = `/api/products/category/${categorySlug}/`;
		const response = await axiosInstance<any[]>({
			method: "get",
			url,
			token: "",
			params: searchParams,
		});
		return { data: response, status: 200 };
	} catch (error: any) {
		if (error.status === 401) {
			console.error("Unauthorized access - 401");
			redirect("/auth/login");
		} else if (error.status === 404) {
			console.error("Product not found - 404");
			redirect("/404");
		} else {
			console.error("Error fetching product data:", error);
			throw new Error("An error occurred while fetching product data.");
		}
	}
}

interface GetProductDetailsParams {
	productSlug: string;
}

export async function getProductDetails({
	productSlug,
}: GetProductDetailsParams): Promise<GetProductsResponse> {
	try {
		const url = `/api/products/${productSlug}/`;
		const response = await axiosInstance<any[]>({
			method: "get",
			url,
			token: "",
		});
		return { data: response, status: 200 };
	} catch (error: any) {
		if (error.status === 401) {
			console.error("Unauthorized access - 401");
			redirect("/auth/login");
		} else if (error.status === 404) {
			console.error("Product not found - 404");
			redirect("/404");
		} else {
			console.error("Error fetching product data:", error);
			throw new Error("An error occurred while fetching product data.");
		}
	}
}

interface GetProductDetailsParams {
	productSlug: string;
}

export async function getCategoryMetaData({
	currentCategorySlug,
}: {
	currentCategorySlug: string;
}): Promise<GetProductsResponse> {
	try {
		const url = `/api/products/category-meta/${currentCategorySlug}/`;
		const response = await axiosInstance<any[]>({
			method: "get",
			url,
			token: "",
		});
		return { data: response, status: 200 };
	} catch (error: any) {
		if (error.status === 401) {
			console.error("Unauthorized access - 401");
			redirect("/auth/login");
		} else if (error.status === 404) {
			console.error("Product not found - 404");
			redirect("/404");
		} else {
			console.error("Error fetching product data:", error);
			throw new Error("An error occurred while fetching product data.");
		}
	}
}
