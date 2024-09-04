// api/getProductsList.ts

"use server";

import { fetchGetApiData } from "@/api/fetchApiData";
import { CartItems } from "@/app/types";

export const getCartItems = async (sessionid: string): Promise<CartItems | { status: number }> => {
	try {
		const response = await fetchGetApiData<CartItems, Record<string, unknown>>({
			query: "/api/carts/cart-items",
			variables: {},
			cache: "no-store",
			next: {},
			sessionid,
		});
		return response;
	} catch (error) {
		console.error("API Error:", error);
		return { status: 500 };
	}
};
