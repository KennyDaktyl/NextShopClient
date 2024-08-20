import { getCartItems } from "@/api/getCartItems";
import { cookies } from "next/headers";
import CartClient from "@/components/cart/CartClient";
import { getDeliveryMethods } from "@/api/getDeliveryMethods";
import { DeliveryMethod, PaymentMethod, CartItems, CartTotalPrice, UserData } from "@/app/types";
import { getTotalPrice } from "@/api/getCartTotalPrice";
import { getPaymentMethods } from "@/api/getPaymentMethods";
import { getUserData } from "@/api/getUserData";
import { Session } from "next-auth";
import { auth } from "@/auth";

export default async function CartPage() {
	const sessionId = cookies().get("sessionid")?.value ?? "";

	let cartItems: any[] = [];
	let totalPrice: number = 0;

	const response: CartItems | { status: number } = await getCartItems(sessionId);
	const responseTotalPrice: CartTotalPrice | { status: number } = await getTotalPrice(sessionId);

	if ("cart_items" in response && "total_price" in responseTotalPrice) {
		cartItems = response.cart_items ?? [];
		totalPrice = responseTotalPrice.total_price ?? 0;
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
	let userData: UserData | undefined;

	if (session?.user?.accessToken) {
		const response = await getUserData(session.user.accessToken);
		userData = response.data;
	} else {
		userData = undefined;
	}

	return (
		<CartClient
			cartItems={cartItems}
			totalPrice={totalPrice}
			deliveryMethods={deliveryMethods}
			paymentMethods={paymentMethods}
			userData={userData}
		/>
	);
}
