import { getCartItems } from "@/api/getCartItems";
import { cookies } from "next/headers";
import CartClient from "@/components/cart/CartClient";
import { getDeliveryMethods } from "@/api/getDeliveryMethods";
import {
	DeliveryMethod,
	PaymentMethod,
	CartItems,
	CartTotalPrice,
	UserData,
	CartItem,
} from "@/app/types";
import { getTotalPrice } from "@/api/getCartTotalPrice";
import { getPaymentMethods } from "@/api/getPaymentMethods";
import { getUserData } from "@/api/getUserData";
import { Session } from "next-auth";
import { auth } from "@/auth";

export async function generateMetadata() {
	return {
		title: `Podsumowanie koszyka`,
		description: "Podsumowanie koszyka",
		alternates: {
			canonical: "/koszyk",
		},
	};
}

export default async function CartPage() {
	const sessionId = cookies().get("sessionid")?.value ?? "";

	let cartItems: CartItem[] = [];
	let totalPrice: number = 0;
	let freeDelivery: boolean = false;

	const response: CartItems | { status: number } = await getCartItems(sessionId);
	const responseTotalPrice: CartTotalPrice | { status: number } = await getTotalPrice(sessionId);

	if (
		"cart_items" in response &&
		"total_price" in responseTotalPrice &&
		"free_delivery" in response
	) {
		cartItems = response.cart_items ?? [];
		totalPrice = responseTotalPrice.total_price ?? 0;
		freeDelivery = response.free_delivery ?? false;
	}

	const deliveryMethodsResponse = await getDeliveryMethods(sessionId);
	const deliveryMethods: DeliveryMethod[] = Array.isArray(deliveryMethodsResponse)
		? deliveryMethodsResponse
		: [];

	const paymentMethodsResponse = await getPaymentMethods(sessionId);
	const paymentMethods: PaymentMethod[] = Array.isArray(paymentMethodsResponse)
		? paymentMethodsResponse
		: [];

	const session: Session | null = await auth();
	let accessToken: string | undefined;
	if (!session || !session.user) {
		accessToken = undefined;
	} else {
		accessToken = session.user.accessToken;
	}

	let userData: UserData | undefined;

	if (accessToken) {
		const response = await getUserData(accessToken);
		userData = response.data;
	} else {
		userData = undefined;
	}
	console.log("free_delivery", freeDelivery);
	return (
		<CartClient
			cartItems={cartItems}
			freeDelivery={freeDelivery}
			totalPrice={totalPrice}
			deliveryMethods={deliveryMethods}
			paymentMethods={paymentMethods}
			userData={userData}
			accessToken={accessToken}
		/>
	);
}
