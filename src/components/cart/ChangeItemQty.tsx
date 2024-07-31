"use client";
import { useOptimistic } from "react";
import { formatMoney } from "@/utils";
import { UUID } from "crypto";
import { changeItemQuantity } from "@/app/cart/actions";

export const ChangeQuantity = ({
	itemId,
	quantity,
	price,
}: {
	itemId: UUID;
	quantity: number;
	price: number;
}) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(currentState, optimisticValue: number) => optimisticValue,
	);

	const handleDecrementClick = () => {
		if (optimisticQuantity > 1) {
			const newQuantity = optimisticQuantity - 1;
			setOptimisticQuantity(newQuantity);
			changeItemQuantity({ itemId, quantity: newQuantity }).catch((error) => {
				console.error("Error decrementing quantity:", error);
				setOptimisticQuantity(optimisticQuantity); // Revert optimistic update on error
			});
		}
	};

	const handleIncrementClick = () => {
		const newQuantity = optimisticQuantity + 1;
		setOptimisticQuantity(newQuantity);
		changeItemQuantity({ itemId, quantity: newQuantity }).catch((error) => {
			console.error("Error incrementing quantity:", error);
			setOptimisticQuantity(optimisticQuantity); // Revert optimistic update on error
		});
	};

	return (
		<>
			<td className="w-[100px] border border-gray-300 px-4 py-2 text-center">
				<form key={itemId} className="flex items-center justify-center text-center">
					<button
						data-testid="decrement"
						className="mr-4 h-8 w-8 border bg-slate-50 text-red-500"
						type="button"
						onClick={() => {
							handleDecrementClick();
						}}
					>
						-
					</button>
					<span data-testid="quantity" className="w-8 text-center">
						{optimisticQuantity}
					</span>
					<button
						data-testid="increment"
						className="ml-4 h-8 w-8 border bg-slate-50 text-green-500"
						type="button"
						onClick={() => {
							handleIncrementClick();
						}}
					>
						+
					</button>
				</form>
			</td>
			<td className="w-[100px] border border-gray-300 px-4 py-2 text-center">
				<div className="flex flex-wrap items-center justify-center">
					<p className="w-full text-center">{formatMoney(optimisticQuantity * price)}</p>
					<span className="mt-1 w-full text-center text-xs">
						{formatMoney((optimisticQuantity * price) / 1.23)}+23%VAT
					</span>
				</div>
			</td>
		</>
	);
};
