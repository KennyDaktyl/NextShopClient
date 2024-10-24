import { getCartItems } from "@/api/getCartItems";
import { cookies } from "next/headers";
import CartClient from "@/components/cart/CartClient";
import { getDeliveryMethods } from "@/api/getDeliveryMethods";
import {
	DeliveryMethod,
	PaymentMethod,
	CartItems,
	CartTotalPrice,
	UserProfileData,
	CartItem,
} from "@/app/types";
import { getTotalPrice } from "@/api/getCartTotalPrice";
import { getPaymentMethods } from "@/api/getPaymentMethods";
import { getUserProfileData } from "@/api/getUserData";
import { Session } from "next-auth";
import { auth } from "@/auth";

export async function generateMetadata() {
	return {
		title: `Podsumowanie koszyka`,
		description: "Podsumowanie koszyka",
		alternates: {
			canonical: "/koszyk",
		},
		robots: "no-index, no-follow",
	};
}

export default async function CartPage() {
	const sessionId = cookies().get("sessionid")?.value ?? "";

	let cartItems: CartItem[] = [];
	let totalPrice: number = 0;
	let freeDelivery: boolean = false;
	let free_delivery_treshold: number = 0;

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
		free_delivery_treshold = response.free_delivery_treshold ?? 0;
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

	let userData: UserProfileData | undefined;

	if (accessToken) {
		const response = await getUserProfileData(accessToken);
		userData = response.data;
	} else {
		userData = undefined;
	}
	return (
		<CartClient
			cartItems={cartItems}
			freeDelivery={freeDelivery}
			freeDeliveryTreshold={free_delivery_treshold}
			totalPrice={totalPrice}
			deliveryMethods={deliveryMethods}
			paymentMethods={paymentMethods}
			userData={userData}
			accessToken={accessToken}
		/>
	);
}
