// api/getProductsList.ts

"use server";

import { fetchGetApiData } from "@/api/fetchApiData";
import { CartItems } from "@/app/types";

export const getCartItems = async (): Promise<CartItems | { status: number }> => {
    try {
        const response = await fetchGetApiData<CartItems, {}>({
            query: "/api/carts/cart-items",
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
