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
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { updateOrderStatus } from "@/api/updateOrderStatus";

export async function addToCartAction(cartItemData: {
	product_id: number;
	quantity: number;
	variant_id: number | null;
	selected_option?: { option_id: number; value_id: number } | undefined;
	info?: string | undefined;
}): Promise<{ success: boolean; message?: string }> {
	const { product_id, quantity, variant_id, selected_option, info } = cartItemData;

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
					info: string | undefined;
				}
			>({
				query: "/api/carts/create",
				variables: {
					product_id,
					quantity,
					variant_id,
					selected_option,
					info,
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
					info: string | undefined;
				}
			>({
				query: "/api/carts/update",
				variables: {
					product_id,
					quantity,
					variant_id,
					cart_id: cartId,
					selected_option,
					info,
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

export async function createOrderAction({
	data,
	accessToken,
	paymentMethodOnline,
}: {
	data: OrderData;
	accessToken?: string;
	paymentMethodOnline: boolean;
	freeDelivery: boolean;
}): Promise<newOrderResponse> {
	const orderData = {
		client_name: data.name,
		client_email: data.email,
		client_mobile: data.mobile,
		cart_items_price: data.cart_items_price,
		delivery_price: data.delivery_price,
		payment_price: data.payment_price,
		delivery_method: data.delivery_method,
		payment_method: data.payment_method,
		amount: data.amount,
		cart_items: data.cart_items,
		inpost_box_id: data.inpost_box_id,
		info: data.info,
		token: accessToken,
		company: data.company,
		company_payer: data.company_payer,
		nip: data.nip,
		invoice_street: data.invoice_street,
		invoice_house_number: data.invoice_house_number,
		invoice_local_number: data.invoice_local_number,
		invoice_city: data.invoice_city,
		invoice_postal_code: data.invoice_postal_code,
		street: data.street,
		house_number: data.house_number,
		local_number: data.local_number,
		city: data.city,
		postal_code: data.postal_code,
		make_invoice: data.make_invoice,
	};

	const response = await createOrder(orderData);
	revalidateTag("cart");
	revalidatePath("/koszyk");

	cookies().set("cartId", "", { maxAge: 0 });

	const orderId = (response as newOrderResponse).order_id;

	if (paymentMethodOnline) {
		if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
			throw new Error("Missing STRIPE_SECRET_KEY env variable");
		}

		const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
			apiVersion: "2024-06-20",
			typescript: true,
		});

		const lineItems = orderData.cart_items.map((item) => {
			const description = [item.variant, item.selected_option].filter(Boolean).join(", ");

			return {
				price_data: {
					currency: "pln",
					product_data: {
						name: item.name || "",
						...(description && { description }),
						images: item.image?.url ? [item.image.url] : [],
					},
					unit_amount: Math.round(Number(item.price) * 100),
				},
				quantity: item.quantity,
			};
		});

		if (Number(orderData.delivery_price) > 0) {
			lineItems.push({
				price_data: {
					currency: "pln",
					product_data: {
						name: "Koszt dostawy",
						images: [],
					},
					unit_amount: Math.round(Number(orderData.delivery_price) * 100),
				},
				quantity: 1,
			});
		}

		if (Number(orderData.payment_price) > 0) {
			lineItems.push({
				price_data: {
					currency: "pln",
					product_data: {
						name: "Koszt płatności" || "",
						images: [],
					},
					unit_amount: Math.round(Number(orderData.payment_price) * 100),
				},
				quantity: 1,
			});
		}
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card", "blik", "p24"],
			metadata: {
				order_id: orderId,
			},
			line_items: lineItems,
			customer_email: orderData.client_email,
			locale: "pl",
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/koszyk/platnosc-udana?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/koszyk/platnosc-anulowana/?order_id=${orderId}`,
		});
		if (session.url && session.id) {
			await updateOrderStatus({ status: 1, orderId, checkoutSessionId: session.id });
			await removeCart();
			redirect(session.url);
		} else {
			await updateOrderStatus({ status: 7, orderId });
			throw new Error("Invalid response from stripe");
		}
	}

	if ("order_id" in response) {
		await updateOrderStatus({ status: 5, orderId });
		await removeCart();
		redirect(`/koszyk/zamowienie-w-przygotowaniu?order_id=${orderId}`);
	} else {
		throw new Error("Invalid response from createOrder");
	}
}

export async function updateOrderStatusAction({
	orderId,
	status,
}: {
	orderId: number;
	status: number;
}): Promise<void> {
	await updateOrderStatus({ status, orderId });
}
