"use client";

import { removeItemAction } from "@/app/cart/actions";
import { UUID } from "crypto";
import { useTransition, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RemoveItemButtonProps {
	itemId: UUID;
	onRemoveItem: (itemId: UUID) => void;
}

export const RemoveItemButton = ({ itemId, onRemoveItem }: RemoveItemButtonProps) => {
	const [isPending, startTransition] = useTransition();

	const handleRemoveClick = useCallback(() => {
		startTransition(async () => {
			try {
				await removeItemAction({ itemId });
				toast.success("Produkt usunięty z koszyka", {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				onRemoveItem(itemId);
			} catch (error) {
				console.error("Error removing item:", error);
				toast.error("Błąd usuwania produktu z koszyka", {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		});
	}, [itemId, onRemoveItem]);

	return (
		<button
			disabled={isPending}
			onClick={handleRemoveClick}
			className="text-center font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-wait disabled:text-slate-400"
		>
			Usuń
		</button>
	);
};
