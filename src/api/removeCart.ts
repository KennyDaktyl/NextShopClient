"use server";

import { fetchPostApiData } from "@/api/fetchPostApiData";
import { CartItems } from "@/app/types";

export const removeCart = async (): Promise<CartItems | { status: number }> => {
	try {
		const response = await fetchPostApiData<CartItems, object>({
			query: "/api/carts/remove-cart",
			variables: {},
			cache: "no-store",
			next: {
				tags: ["cart"],
			},
		});

		return response;
	} catch (error) {
		console.error("API Error:", error);
		return { status: 500 };
	}
};
