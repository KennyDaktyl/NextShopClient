"use client";

import { UUID } from "crypto";
import { CartItem, DeliveryMethod, PaymentMethod } from "@/app/types";
import { CartTableRow } from "@/components/cart/atoms/CartTableRow";
import { CartTableFooter } from "@/components/cart/atoms/CartTableFooter";

interface CartTableProps {
	cartItems: CartItem[];
	freeDelivery: boolean;
	onUpdateCartItems: (newCartItems: any[]) => void;
	deliveryMethod: DeliveryMethod;
	paymentMethod: PaymentMethod;
}

export default function CartTable({
	cartItems,
	freeDelivery,
	onUpdateCartItems,
	deliveryMethod,
	paymentMethod,
}: CartTableProps) {
	const handleQuantityChange = (itemId: UUID, newQuantity: number) => {
		const updatedItems = cartItems.map((item) =>
			item.item_id === itemId ? { ...item, quantity: newQuantity } : item,
		);
		onUpdateCartItems(updatedItems);
	};

	const handleRemoveItem = (itemId: UUID) => {
		const updatedItems = cartItems.filter((item) => item.item_id !== itemId);
		onUpdateCartItems(updatedItems);
	};

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
						{cartItems.map((item) => (
							<CartTableRow
								key={item.item_id}
								item={item}
								onQuantityChange={handleQuantityChange}
								onRemoveItem={handleRemoveItem}
							/>
						))}
					</tbody>
				</table>
			</div>
			<CartTableFooter
				cartItems={cartItems}
				freeDelivery={freeDelivery}
				deliveryMethod={deliveryMethod}
				paymentMethod={paymentMethod}
			/>
		</>
	);
}
