"use client";

import { FormEvent } from "react";
import { removeCartAction } from "@/app/cart/actions";
import { Button } from "@/components/ui/button";

const RemoveCartForm = () => {
	const handleRemoveCart = async (event: FormEvent) => {
		event.preventDefault();
		try {
			await removeCartAction();
		} catch (error) {
			console.error("Error removing cart:", error);
		}
	};

	return (
		<form
			onSubmit={(event) => {
				void handleRemoveCart(event);
			}}
		>
			<Button type="submit" variant="outline" className="rounded-md transition hover:bg-gray-500">
				Usuń koszyk
			</Button>
		</form>
	);
};

export default RemoveCartForm;
