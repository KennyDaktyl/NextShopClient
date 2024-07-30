// api/getProductsList.ts

"use server";

import { fetchGetApiData } from "@/api/fetchApiData";
import { CartTotalPrice } from "@/app/types";

export const getTotalPrice = async (): Promise<CartTotalPrice | { status: number }> => {
    try {
        const response = await fetchGetApiData<CartTotalPrice, {}>({
            query: "/api/carts/total-price",
            variables: {},
            cache: "force-cache",
            next: {
                tags: ["cart"]
            }
        });

        return response;
    } catch (error) {
        console.error("API Error:", error);
        return { status: 500 };
    }
};
