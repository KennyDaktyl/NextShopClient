"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface QuantityControlProps {
	maxQuantity: number;
	initialQuantity?: number;
}

export const QuantityControl = ({ maxQuantity, initialQuantity = 1 }: QuantityControlProps) => {
	const [quantity, setQuantity] = useState(initialQuantity);

	const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, maxQuantity));
	const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

	return (
		<div className="flex items-center">
			<Button onClick={decrementQuantity} className="rounded-l-md" variant="outline">
				-
			</Button>
			<span className="min-w-28 px-4 py-2 text-center text-gray-700">{quantity}</span>
			<Button onClick={incrementQuantity} className="rounded-r-md" variant="outline">
				+
			</Button>
		</div>
	);
};
