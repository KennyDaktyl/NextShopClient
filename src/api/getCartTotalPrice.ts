"use server";

import { fetchGetApiData } from "@/api/fetchApiData";
import { CartTotalPrice } from "@/app/types";

export const getTotalPrice = async (
	sessionid: string,
): Promise<CartTotalPrice | { status: number }> => {
	try {
		const response = await fetchGetApiData<CartTotalPrice, {}>({
			query: "/api/carts/total-price",
			variables: {},
			cache: "force-cache",
			next: {
				tags: ["cart"],
			},
			sessionid,
		});

		return response;
	} catch (error) {
		console.error("API Error:", error);
		return { status: 500 };
	}
};
