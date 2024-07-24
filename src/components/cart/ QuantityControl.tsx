"use client";

import { Button } from "@/components/ui/button";

interface QuantityControlProps {
	quantity: number;
	setQuantity: (quantity: number) => void;
	maxQuantity: number;
}

export const QuantityControl = ({ quantity, setQuantity, maxQuantity }: QuantityControlProps) => {
	const incrementQuantity = () => setQuantity(Math.min(quantity + 1, maxQuantity));
	const decrementQuantity = () => setQuantity(Math.max(quantity - 1, 1));

	return (
		<div className="mb-4 flex items-center">
			<Button
				onClick={decrementQuantity}
				className="rounded-l-md hover:bg-slate-50"
				variant="outline"
			>
				-
			</Button>
			<span className="min-w-28 px-4 py-2 text-center text-gray-700">{quantity}</span>
			<Button
				onClick={incrementQuantity}
				className="rounded-r-md hover:bg-slate-50"
				variant="outline"
			>
				+
			</Button>
		</div>
	);
};
