"use client";

import { addToCartAction } from "@/app/koszyk/actions";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { gtagEvent } from "@/utils";

type AddToCartButtonProps = {
	cartItemData: {
		product_id: number;
		variant_id: number | null;
		quantity: number;
		is_available: boolean;
		selected_option?: { option_id: number; value_id: number } | undefined;
		info?: string | undefined;
	};
	onAddedToCart: () => boolean;
};

export default function AddToCartButton({ cartItemData, onAddedToCart }: AddToCartButtonProps) {
	const [isPending, startTransition] = useTransition();
	const outOffStock = !cartItemData.is_available;
	const handleClick = async () => {
		startTransition(async () => {
			if (onAddedToCart()) {
				const result = await addToCartAction(cartItemData);
				if (result.success) {
					toast.success("Produkt dodany do koszyka!", {
						position: "top-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					gtagEvent("add_to_cart", {
						product_id: cartItemData.product_id,
						quantity: cartItemData.quantity,
						is_available: cartItemData.is_available,
					});
				} else {
					toast.error(result.message || "Wystąpił błąd podczas dodawania do koszyka", {
						position: "top-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
			}
		});
	};

	return (
		<Button
			type="button"
			onClick={handleClick}
			disabled={isPending || outOffStock}
			aria-label="Dodaj produkt do koszyka"
			className={`w-full rounded-md text-white transition hover:bg-gray-500 ${isPending ? "cursor-wait hover:cursor-wait" : "cursor-pointer"} transition-shadow`}
		>
			Dodaj do koszyka {outOffStock}
		</Button>
	);
}
