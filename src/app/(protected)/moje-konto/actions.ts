"use server";
import axiosInstance from "@/axios";
import { redirect } from "next/navigation";

export async function getUserData(): Promise<GetProductsResponse> {
	try {
		const url = "/api/accounts/profile/";
		const response = await axiosInstance<any[]>({ method: "get", url, withToken: true });
		console.log("responseAction: ", response);
		return { data: response, status: 200 };
	} catch (error: any) {
		console.log("errorAction: ", error);
		if (error.status === 401) {
			console.error("Unauthorized access - 401");
			redirect("/auth/login");
		} else {
			console.error("Error fetching user data:", error);
			throw new Error("An error occurred while fetching user data.");
		}
	}
}
