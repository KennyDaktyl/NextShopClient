"use client";

import { FormEvent } from "react";
import { removeCartAction } from "@/app/koszyk/actions";
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
			className="mt-4"
			onSubmit={(event) => {
				void handleRemoveCart(event);
			}}
		>
			<Button
				type="submit"
				variant="outline"
				className="rounded-md transition hover:bg-gray-500 hover:text-white"
			>
				Usuń koszyk
			</Button>
		</form>
	);
};

export default RemoveCartForm;
