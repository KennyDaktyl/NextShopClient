"use client";

import { useState } from "react";
import { useOptimistic } from "react";
import { formatMoney } from "@/utils";
import { UUID } from "crypto";
import { changeItemQuantity } from "@/app/cart/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ChangeQuantity = ({
	itemId,
	quantity,
	availableQuantity,
	price,
}: {
	itemId: UUID;
	quantity: number;
	availableQuantity: number;
	price: number;
}) => {
	const [isPending, setIsPending] = useState(false);
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(currentState, optimisticValue: number) => optimisticValue,
	);

	const handleDecrementClick = async () => {
		if (optimisticQuantity > 1) {
			const newQuantity = optimisticQuantity - 1;
			setOptimisticQuantity(newQuantity);
			setIsPending(true);
			try {
				await changeItemQuantity({ itemId, quantity: newQuantity });
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
				setOptimisticQuantity(optimisticQuantity);
			} finally {
				setIsPending(false);
			}
		}
	};

	const handleIncrementClick = async () => {
		if (optimisticQuantity < availableQuantity) {
			const newQuantity = optimisticQuantity + 1;
			setOptimisticQuantity(newQuantity);
			setIsPending(true);
			try {
				await changeItemQuantity({ itemId, quantity: newQuantity });
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
				setOptimisticQuantity(optimisticQuantity);
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
