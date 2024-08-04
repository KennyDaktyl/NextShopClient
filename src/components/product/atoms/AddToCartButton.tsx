"use client";

import { addToCartAction } from "@/app/cart/actions";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

type AddToCartButtonProps = {
	formData: FormData;
	onAddedToCart: () => void;
};

export default function AddToCartButton({ formData, onAddedToCart }: AddToCartButtonProps) {
	const [isPending, startTransition] = useTransition();

	const handleClick = async () => {
		startTransition(async () => {
			const result = await addToCartAction(formData);
			if (result.success) {
				onAddedToCart();
				toast.success("Produkt dodany do koszyka!", {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
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
		});
	};

	return (
		<Button
			type="button"
			onClick={handleClick}
			disabled={isPending}
			className={`w-full rounded-md text-white transition hover:bg-gray-500 ${isPending ? "cursor-wait hover:cursor-wait" : "cursor-pointer"} transition-shadow`}
		>
			Dodaj do koszyka
		</Button>
	);
}
