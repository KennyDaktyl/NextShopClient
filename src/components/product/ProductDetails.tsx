"use client";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
	product: Product;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
	const [quantity, setQuantity] = useState(1);

	const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, product.qty));
	const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

	return (
		<div className="flex w-full flex-wrap items-start justify-center rounded-lg bg-white p-4 shadow-lg">
			<div className="w-full p-4 md:w-2/3">
				<AspectRatio ratio={1 / 1} className="bg-muted overflow-hidden">
					<Image
						src={product.full_image_url}
						alt={product.name}
						className="rounded-md object-cover"
						fill
						sizes="(max-width: 768px) 100vw, 
                   (max-width: 1200px) 50vw, 
                   33vw"
					/>
				</AspectRatio>
			</div>
			<div className="w-full p-4 md:w-1/3">
				<h1 className="mb-2 text-2xl font-bold">{product.name}</h1>
				<span className="mb-4 block text-sm text-gray-500">{product.category.name}</span>
				<p className="mb-4">{product.description}</p>
				<p className="mb-4 text-xl font-semibold">Cena: {formatMoney(product.current_price)}</p>
				<small className="mb-4 block">
					Cena z ostatnich 30 dni: {formatMoney(product.min_price_last_30)}
				</small>
				<div className="mb-4 flex items-center">
					<Button onClick={decrementQuantity} className="rounded-l-md" variant="outline">
						-
					</Button>
					<span className="bg-gray-100 px-4 py-2 text-gray-700">{quantity}</span>
					<Button onClick={incrementQuantity} className="rounded-r-md" variant="outline">
						+
					</Button>
				</div>
				<p className="mb-4">Dostępna ilość: {product.qty}</p>
				<Button className="w-full rounded-md text-white transition hover:bg-gray-500">
					Dodaj do koszyka
				</Button>
			</div>
		</div>
	);
};

export default ProductDetails;
