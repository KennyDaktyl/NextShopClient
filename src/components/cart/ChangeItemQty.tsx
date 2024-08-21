"use client";

import { useState, startTransition } from "react";
import { useOptimistic } from "react";
import { formatMoney } from "@/utils";
import { UUID } from "crypto";
import { changeItemQuantity } from "@/app/koszyk/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ChangeQuantity = ({
	itemId,
	quantity,
	availableQuantity,
	price,
	onQuantityChange, // Dodano
}: {
	itemId: UUID;
	quantity: number;
	availableQuantity: number;
	price: number;
	onQuantityChange: (itemId: UUID, newQuantity: number) => void; // Dodano
}) => {
	const [isPending, setIsPending] = useState(false);
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(currentState, optimisticValue: number) => optimisticValue,
	);

	const handleDecrementClick = async () => {
		if (optimisticQuantity > 1) {
			startTransition(() => {
				const newQuantity = optimisticQuantity - 1;
				setOptimisticQuantity(newQuantity);
				onQuantityChange(itemId, newQuantity); // Dodano
			});
			setIsPending(true);
			try {
				await changeItemQuantity({ itemId, quantity: optimisticQuantity - 1 });
				toast.success("Zmniejszono ilość o 1", {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} catch (error) {
				console.error("Error decrementing quantity:", error);
				startTransition(() => {
					setOptimisticQuantity(optimisticQuantity);
					onQuantityChange(itemId, optimisticQuantity); // Dodano - przywrócenie starej wartości w razie błędu
				});
			} finally {
				setIsPending(false);
			}
		}
	};

	const handleIncrementClick = async () => {
		if (optimisticQuantity < availableQuantity) {
			startTransition(() => {
				const newQuantity = optimisticQuantity + 1;
				setOptimisticQuantity(newQuantity);
				onQuantityChange(itemId, newQuantity); // Dodano
			});
			setIsPending(true);
			try {
				await changeItemQuantity({ itemId, quantity: optimisticQuantity + 1 });
				toast.success("Zwiększono ilość o 1", {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} catch (error) {
				console.error("Error incrementing quantity:", error);
				startTransition(() => {
					setOptimisticQuantity(optimisticQuantity);
					onQuantityChange(itemId, optimisticQuantity); // Dodano - przywrócenie starej wartości w razie błędu
				});
			} finally {
				setIsPending(false);
			}
		}
	};

	return (
		<>
			<td className="w-[100px] border border-gray-300 px-1 py-1 text-center">
				<form
					key={itemId}
					className={`flex flex-wrap items-center justify-center text-center ${isPending ? "cursor-wait" : ""}`}
				>
					<div className="flex w-full flex-wrap items-center justify-center">
						<button
							data-testid="decrement"
							className={`mr-4 h-8 w-8 border bg-slate-50 text-red-500 ${isPending ? "cursor-wait" : ""}`}
							type="button"
							onClick={() => {
								if (!isPending) handleDecrementClick();
							}}
							disabled={isPending}
						>
							-
						</button>
						<span data-testid="quantity" className="w-8 text-center">
							{optimisticQuantity}
						</span>
						<button
							data-testid="increment"
							className={`ml-4 h-8 w-8 border bg-slate-50 text-green-500 ${isPending ? "cursor-wait" : ""}`}
							type="button"
							onClick={() => {
								if (!isPending) handleIncrementClick();
							}}
							disabled={isPending || optimisticQuantity >= availableQuantity}
						>
							+
						</button>
						<p className="mt-1 w-full text-xs text-gray-500">Dostępna ilość: {availableQuantity}</p>
					</div>
				</form>
			</td>
			<td className="w-[100px] border border-gray-300 px-4 py-2 text-center">
				<div className="flex flex-wrap items-center justify-center">
					<p className="w-full text-center">{formatMoney(optimisticQuantity * price)}</p>
					<span className="mt-1 w-full text-center text-xs">
						{formatMoney((optimisticQuantity * price) / 1.23)}+23% VAT
					</span>
				</div>
			</td>
		</>
	);
};
