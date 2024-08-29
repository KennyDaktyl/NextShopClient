import { fetchPostApiData } from "./fetchPostApiData";
import type { CartItem, newOrderResponse } from "@/app/types";

export const createOrder = async ({
	token,
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
	info,
	inpost_box_id,
	street,
	house_number,
	local_number,
	city,
	postal_code,
	invoice,
	company,
	company_payer,
	nip,
	invoice_street,
	invoice_house_number,
	invoice_local_number,
	invoice_city,
	invoice_postal_code,
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
	street?: string;
	house_number?: string;
	local_number?: string;
	city?: string;
	postal_code?: string;
	invoice?: boolean;
	company?: string;
	company_payer?: string;
	nip?: string;
	invoice_street?: string;
	invoice_house_number?: string;
	invoice_local_number?: string;
	invoice_city?: string;
	invoice_postal_code?: string;
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
		street,
		house_number,
		local_number,
		city,
		postal_code,
		invoice,
		company,
		company_payer,
		nip,
		invoice_street,
		invoice_house_number,
		invoice_local_number,
		invoice_city,
		invoice_postal_code,
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
