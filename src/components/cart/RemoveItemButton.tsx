"use client";

import { removeItem } from "@/api/removeItemFromCart";
import { removeItemAction } from "@/app/cart/actions";
import { UUID } from "crypto";
import { useTransition } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RemoveItemButton = ({ itemId }: { itemId: UUID }) => {
	const [isPending, startTransition] = useTransition();

	return (
		<>
			<button
				disabled={isPending}
				onClick={() =>
					startTransition(async () => {
						try {
							await removeItemAction({
								itemId,
							});
							toast.success("Produkt usunięty z koszyka", {
								position: "top-right",
								autoClose: 2000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							});
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
					})
				}
				className="text-center font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-wait disabled:text-slate-400"
			>
				Usuń
			</button>
		</>
	);
};
