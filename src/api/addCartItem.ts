import { fetchPostApiData } from "./fetchPostApiData";
import type { CartResponse } from "@/app/types";

export const addCartItem = async ({
	productId,
	quantity,
	variantId,
	info,
	token,
	cartId,
}: {
	productId: number;
	quantity: number;
	variantId?: number;
	info?: string;
	token?: string;
	cartId?: string;
}): Promise<CartResponse | { status: number }> => {
	const variables = {
		product_id: productId,
		quantity: quantity,
		variant_id: variantId,
		cart_id: cartId,
		info: info,
	};

	const query = cartId ? "/api/cart/update/" : "/api/cart/create/";

	return fetchPostApiData<CartResponse, typeof variables>({
		query,
		variables,
		token,
		next: {
			tags: ["cart"],
		},
	});
};
