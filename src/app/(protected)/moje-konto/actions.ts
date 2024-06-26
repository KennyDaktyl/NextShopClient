// src/app/(protected)/moje-konto/actions.ts

import axiosInstance from "@/axios";

export async function getUserData(accessToken: string): Promise<GetProductsResponse> {
	try {
		const url = "/api/accounts/profile/";
		const response = await axiosInstance<any[]>({ method: "get", url, token: accessToken });
		return { data: response, status: 200 };
	} catch (error: any) {
		console.error("Error fetching user data:", error);
		throw new Error("An error occurred while fetching user data.");
	}
}
