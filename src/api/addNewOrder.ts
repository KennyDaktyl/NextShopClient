import { fetchPostApiData } from "./fetchPostApiData";
import type { CartItem, newOrderResponse } from "@/app/types";

export const createOrder = async ({
	client_name,
	client_email,
	client_mobile,
	delivery_price,
	payment_price,
	cart_items,
	cart_items_price,
	delivery_method,
	payment_method,
	amount,
	inpost_box_id,
	info,
	token,
}: {
	client_name: string;
	client_email: string;
	client_mobile: string;
	cart_items_price: string;
	delivery_price: string;
	payment_price: string;
	cart_items: CartItem[];
	delivery_method: string;
	payment_method: string;
	amount: string;
	inpost_box_id?: string;
	info?: string;
	token?: string;
}): Promise<newOrderResponse | { status: number }> => {
	const variables = {
		client_name,
		client_email,
		client_mobile,
		delivery_price,
		payment_price,
		cart_items,
		cart_items_price,
		delivery_method,
		payment_method,
		amount,
		inpost_box_id,
		info,
	};

	const query = "/api/orders/create/";

	return fetchPostApiData<newOrderResponse, typeof variables>({
		query,
		variables,
		token,
		next: {
			tags: ["order"],
		},
	});
};
