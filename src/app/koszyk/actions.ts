"use server";
import { cookies } from "next/headers";
import { fetchPostApiData } from "@/api/fetchPostApiData";
import { revalidatePath, revalidateTag } from "next/cache";
import { UUID } from "crypto";
import { updateCartItemQty } from "@/api/updateCartItemQty";
import { CartResponse, OrderData, newOrderResponse } from "@/app/types";
import { removeCart } from "@/api/removeCart";
import { removeItem } from "@/api/removeItemFromCart";
import { createOrder } from "@/api/addNewOrder";
import { data } from "autoprefixer";

export async function addToCartAction(cartItemData: {
	product_id: number;
	quantity: number;
	variant_id: number | null;
	selected_option?: { option_id: number; value_id: number } | undefined;
}): Promise<{ success: boolean; message?: string }> {
	const { product_id, quantity, variant_id, selected_option } = cartItemData;

	const cartId = cookies().get("cartId")?.value;
	let response: CartResponse;

	try {
		if (!cartId) {
			response = await fetchPostApiData<
				CartResponse,
				{
					product_id: number;
					quantity: number;
					variant_id: number | null;
					selected_option?: { option_id: number; value_id: number };
				}
			>({
				query: "/api/carts/create",
				variables: {
					product_id,
					quantity,
					variant_id,
					selected_option,
				},
				token: cookies().get("token")?.value,
			});
		} else {
			response = await fetchPostApiData<
				CartResponse,
				{
					product_id: number;
					quantity: number;
					variant_id: number | null;
					cart_id: string;
					selected_option?: { option_id: number; value_id: number };
				}
			>({
				query: "/api/carts/update",
				variables: {
					product_id,
					quantity,
					variant_id,
					cart_id: cartId,
					selected_option,
				},
				token: cookies().get("token")?.value,
			});
		}
		cookies().set("cartId", response.cart_id, {
			httpOnly: true,
			sameSite: "lax",
			// secure: true
		});
		revalidateTag("cart");
		revalidatePath("/");
		return { success: true };
	} catch (error: unknown) {
		console.error("Error in addToCartAction:", error);
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error occurred while adding to cart";
		return { success: false, message: errorMessage };
	}
}

export async function removeCartAction() {
	await removeCart();
	cookies().set("cartId", "", { maxAge: 0 });
	revalidatePath("/koszyk");
	revalidatePath("/");
}

export async function changeItemQuantity({
	itemId,
	quantity,
}: {
	itemId: UUID;
	quantity: number;
}): Promise<void> {
	await updateCartItemQty({ itemId, quantity });
	revalidateTag("cart");
	revalidatePath("/koszyk");
}

export async function removeItemAction({ itemId }: { itemId: UUID }): Promise<void> {
	await removeItem({ itemId: itemId });
	revalidateTag("cart");
	revalidatePath("/koszyk");
}

export async function createOrderAction({ data }: { data: OrderData }): Promise<newOrderResponse> {
	const orderData = {
		client_name: data.name,
		client_email: data.email,
		client_phone: data.phone,
		cart_items_price: data.cart_items_price,
		delivery_price: data.delivery_price,
		payment_price: data.payment_price,
		delivery_method: data.delivery_method,
		payment_method: data.payment_method,
		amount: data.amount,
		cart_items: data.cart_items,
		inpost_box_id: data.inpost_box_id,
	};

	const response = await createOrder(orderData);
	revalidateTag("cart");
	revalidatePath("/koszyk");

	if ("order_id" in response) {
		return response;
	} else {
		throw new Error("Invalid response from createOrder");
	}
}
