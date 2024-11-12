import { useState } from "react";
import { formatMoney } from "@/utils";
import { UUID } from "crypto";
import { changeItemQuantity } from "@/app/koszyk/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { revalidatePath } from "next/cache";

export const ChangeQuantity = ({
	itemId,
	quantity,
	availableQuantity,
	price,
	onQuantityChange,
}: {
	itemId: UUID;
	quantity: number;
	availableQuantity: number;
	price: number;
	onQuantityChange: (itemId: UUID, newQuantity: number) => void;
}) => {
	const [isPending, setIsPending] = useState(false);
	const [optimisticQuantity, setOptimisticQuantity] = useState(quantity);

	const handleDecrementClick = async () => {
		if (optimisticQuantity > 1 && !isPending) {
			const newQuantity = optimisticQuantity - 1;
			setOptimisticQuantity(newQuantity);
			setIsPending(true);

			try {
				await changeItemQuantity({ itemId, quantity: newQuantity });
				onQuantityChange(itemId, newQuantity);
				toast.success("Zmniejszono ilość o 1", { position: "top-right", autoClose: 2000 });
			} catch (error) {
				console.error("Error decrementing quantity:", error);
				setOptimisticQuantity(quantity);
				toast.error("Wystąpił błąd przy zmniejszaniu ilości");
			} finally {
				setIsPending(false);
			}
		}
	};

	// Obsługa zwiększenia ilości
	const handleIncrementClick = async () => {
		if (optimisticQuantity < availableQuantity && !isPending) {
			const newQuantity = optimisticQuantity + 1;
			setOptimisticQuantity(newQuantity); // Natychmiastowa zmiana w UI
			setIsPending(true);

			try {
				await changeItemQuantity({ itemId, quantity: newQuantity });
				onQuantityChange(itemId, newQuantity); // Zaktualizuj stan koszyka dopiero po sukcesie
				toast.success("Zwiększono ilość o 1", { position: "top-right", autoClose: 2000 });
			} catch (error) {
				console.error("Error incrementing quantity:", error);
				setOptimisticQuantity(quantity); // Przywróć pierwotną ilość w razie błędu
				toast.error("Wystąpił błąd przy zwiększaniu ilości");
			} finally {
				setIsPending(false);
			}
		}
	};

	return (
		<>
			<td className="w-[100px] border border-gray-300 px-1 py-1 text-center">
				<div
					className={`flex w-full flex-wrap items-center justify-center ${isPending ? "cursor-wait" : ""}`}
				>
					<button
						className="mr-4 h-8 w-8 border bg-slate-50 text-red-500"
						type="button"
						onClick={handleDecrementClick}
						disabled={isPending || optimisticQuantity <= 1}
					>
						-
					</button>
					<span className="w-8 text-center">{optimisticQuantity}</span>
					<button
						className="ml-4 h-8 w-8 border bg-slate-50 text-green-500"
						type="button"
						onClick={handleIncrementClick}
						disabled={isPending || optimisticQuantity >= availableQuantity}
					>
						+
					</button>
					<p className="mt-1 w-full text-xs text-gray-500">Dostępna ilość: {availableQuantity}</p>
				</div>
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
