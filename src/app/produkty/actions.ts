"use server";

import axiosInstance from "@/axios";
import { redirect } from "next/navigation";

interface GetProductsParams {
	params: {
		page: string;
	};
}

export async function getProducts({ params }: GetProductsParams): Promise<GetProductsResponse> {
	try {
		const url = `/api/products/`;
		const response = await axiosInstance<any[]>({ method: "get", url, withToken: false, params });
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
