"use server";

import axiosInstance from "@/axios";
import { redirect } from "next/navigation";

export async function getProductsByCategory(categorySlug: string): Promise<GetProductsResponse> {
	try {
		const url = `/api/products/category/${categorySlug}/`;
		const response = await axiosInstance<any[]>({ method: "get", url, withToken: true });
		return { data: response, status: 200 };
	} catch (error: any) {
		if (error.status === 401) {
			console.error("Unauthorized access - 401");
			redirect("/auth/login");
		} else {
			console.error("Error fetching user data:", error);
			throw new Error("An error occurred while fetching user data.");
		}
	}
}
