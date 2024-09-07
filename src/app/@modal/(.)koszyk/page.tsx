import { getCartItems } from "@/api/getCartItems";
import { getTotalPrice } from "@/api/getCartTotalPrice";
import { CartItems, CartTotalPrice, ErrorResponse } from "@/app/types";
import { CartDetailsButton } from "@/components/cart/CartDetailsButton";
import { Overlay } from "@/components/cart/Overlay";
import { formatMoney } from "@/utils";
import { cookies } from "next/headers";

export default async function CartPage() {
	const sessionId = cookies().get("sessionid")?.value ?? "";

	const response: CartItems | ErrorResponse = await getCartItems(sessionId);
	const res: CartTotalPrice | ErrorResponse = await getTotalPrice(sessionId);

	let totalPrice = 0;
	if ("total_price" in res) {
		totalPrice = res.total_price;
	} else {
		console.error("Error fetching total price:", res.status);
	}

	if ("cart_items" in response) {
		if (response.cart_items.length === 0) {
			return (
				<Overlay>
					<h2 className="mb-4 mt-4 w-full text-center text-sm">Koszyk jest pusty</h2>
				</Overlay>
			);
		} else {
			return (
				<Overlay>
					<h2 className="mb-4 mt-4 w-full text-center text-sm">Podgląd koszyka</h2>
					<div className="flex flex-col gap-4">
						{response.cart_items.map((item) => (
							<div key={item.id} className="flex items-start justify-between">
								<div className="flex flex-wrap items-start justify-start">
									<p className="w-full text-lg font-semibold">{item.name}</p>
									<p className="text-sm text-gray-500">Ilość: {item.quantity}</p>
									<p className="text-sm text-gray-500">&nbsp;X&nbsp;{formatMoney(item.price)}</p>
									<small className="w-full">{item.variant}</small>
									<small className="w-full">{item.selected_option}</small>
									<small className="w-full">{item.info}</small>
								</div>
								<p className="text-lg font-semibold">{formatMoney(item.quantity * item.price)}</p>
							</div>
						))}
					</div>
					<p className="mt-4 w-full text-right text-lg font-semibold">
						Razem: {formatMoney(totalPrice)}
					</p>
					{totalPrice !== 0 ? (
						<p className="mt-1 w-full text-right text-xs">
							Netto: {formatMoney(totalPrice / 1.23)}&nbsp;+VAT:{" "}
							{formatMoney(totalPrice - totalPrice / 1.23)}
						</p>
					) : (
						<p className="mt-1 w-full text-right text-xs">
							Netto: {formatMoney(0)}&nbsp;+VAT: {formatMoney(0)}
						</p>
					)}
					<CartDetailsButton />
				</Overlay>
			);
		}
	} else {
		return (
			<Overlay>
				<h1 className="mb-4 text-3xl font-semibold">Błąd ładowania koszyka</h1>
				<p>Status błędu: {response.status}</p>
			</Overlay>
		);
	}
}
