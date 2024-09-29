"use client";

import { UUID } from "crypto";
import { CartItem, DeliveryMethod, PaymentMethod } from "@/app/types";
import { CartTableRow } from "@/components/cart/atoms/CartTableRow";
import { CartTableFooter } from "@/components/cart/atoms/CartTableFooter";
import { useEffect, useState } from "react";

interface CartTableProps {
	cartItems: CartItem[];
	freeDelivery: boolean;
	freeDeliveryTreshold: number;
	onUpdateCartItems: (newCartItems: CartItem[]) => void;
	deliveryMethod: DeliveryMethod;
	paymentMethod: PaymentMethod;
}

export default function CartTable({
	cartItems,
	freeDelivery,
	freeDeliveryTreshold,
	onUpdateCartItems,
	deliveryMethod,
	paymentMethod,
}: CartTableProps) {
	const [isFreeDelivery, setIsFreeDelivery] = useState(freeDelivery);

	const handleQuantityChange = (itemId: UUID, newQuantity: number) => {
		const updatedItems = cartItems.map((item) =>
			item.item_id === itemId ? { ...item, quantity: newQuantity } : item,
		);
		onUpdateCartItems(updatedItems);
		updateFreeDelivery(updatedItems);
	};

	const handleRemoveItem = (itemId: UUID) => {
		const updatedItems = cartItems.filter((item) => item.item_id !== itemId);
		onUpdateCartItems(updatedItems);
		updateFreeDelivery(updatedItems);
	};

	const updateFreeDelivery = (items: CartItem[]) => {
		const productsTotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
		setIsFreeDelivery(productsTotal >= freeDeliveryTreshold);
	};

	useEffect(() => {
		updateFreeDelivery(cartItems);
	}, [cartItems]);

	return (
		<>
			<div className="overflow-x-auto">
				<table className="mx-auto w-full min-w-[800px] table-fixed border-collapse border border-gray-300">
					<thead>
						<tr>
							<th className="w-[300px] border border-gray-300 px-4 py-2 text-sm">Nazwa produktu</th>
							<th className="w-[160px] border border-gray-300 px-4 py-2 text-sm">Foto</th>
							<th className="w-[160px] border border-gray-300 px-4 py-2 text-sm">Cena za szt.</th>
							<th className="w-[160px] border border-gray-300 px-4 py-2 text-sm">Ilość</th>
							<th className="w-[200px] border border-gray-300 px-4 py-2 text-sm">Razem</th>
							<th className="w-[100px] border border-gray-300 px-4 py-2 text-sm">Akcja</th>
						</tr>
					</thead>
					<tbody>
						{cartItems.length > 0 ? (
							cartItems.map((item) => (
								<CartTableRow
									key={item.item_id}
									item={item}
									onQuantityChange={handleQuantityChange}
									onRemoveItem={handleRemoveItem}
								/>
							))
						) : (
							<tr>
								<td colSpan={6} className="py-4 text-center">
									Brak produktów w koszyku
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<CartTableFooter
				cartItems={cartItems}
				freeDelivery={isFreeDelivery}
				deliveryMethod={deliveryMethod}
				paymentMethod={paymentMethod}
			/>
		</>
	);
}
