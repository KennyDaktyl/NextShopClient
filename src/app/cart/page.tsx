import { getCartItems } from "@/api/getCartItems";
import { cookies } from "next/headers";
import CartTable from "@/components/cart/atoms/CartTable";
import { getDeliveryMethods } from "@/api/getDeliveryMethods";
import { DeliveryMethod, PaymentMethod } from "@/app/types";
import { getTotalPrice } from "@/api/getCartTotalPrice";
import OrderForm from "@/components/cart/OrderForm";
import { getPaymentMethods } from "@/api/getPaymentMethods";

export default async function CartPage() {
	const sessionId = cookies().get("sessionid")?.value ?? "";
	const response = await getCartItems(sessionId);
	const responseTotalPrice = await getTotalPrice(sessionId);
	let cartItems = [];
	let totalPrice = 0;
	let totalNet = 0;
	let totalQty = 0;

	if ("cart_items" in response) {
		cartItems = response.cart_items;
	} else {
		return (
			<div className="">
				<h1 className="mb-4 text-3xl font-semibold">Błąd ładowania koszyka</h1>
				<p>Status błędu: {response.status}</p>
			</div>
		);
	}

	if ("total_price" in responseTotalPrice) {
		totalPrice = responseTotalPrice.total_price;
	} else {
		console.error("Error fetching total price:", responseTotalPrice.status);
	}

	cartItems.forEach((item) => {
		totalQty += item.quantity;
		totalNet += (item.price / 1.23) * item.quantity;
	});
	const vatValue = totalPrice - totalNet;

	const deliveryMethodsResponse = await getDeliveryMethods(sessionId);
	let deliveryMethods: DeliveryMethod[] = [];

	if (Array.isArray(deliveryMethodsResponse)) {
		deliveryMethods = deliveryMethodsResponse;
	} else {
		console.error("Error fetching delivery methods:", deliveryMethodsResponse);
	}

	const paymentMethodsResponse = await getPaymentMethods(sessionId);
	let paymentMethods: PaymentMethod[] = [];

	if (Array.isArray(paymentMethodsResponse)) {
		paymentMethods = paymentMethodsResponse;
	} else {
		console.error("Unexpected API response format:", paymentMethodsResponse);
	}

	return (
		<div className="">
			<h1 className="mb-4 text-xl font-semibold md:text-xl">Podsumowanie koszyka</h1>
			{cartItems.length > 0 ? (
				<>
					<CartTable
						cartItems={cartItems}
						totalQty={totalQty}
						totalNet={totalNet}
						totalPrice={totalPrice}
						vatValue={vatValue}
					/>
					<OrderForm
						deliveryMethods={deliveryMethods}
						paymentMethods={paymentMethods}
						initialTotalPrice={totalPrice}
						cartItems={cartItems}
					/>
				</>
			) : (
				<p>Brak produktów</p>
			)}
		</div>
	);
}
