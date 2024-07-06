"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DEFAULT_IMAGE_URL, formatMoney } from "@/utils";
import { BackLinkProps, ProductDetails, Variant } from "@/app/types";
import { CarouselPlugin } from "@/components/product/carouselPlugin";
import { ButtonBack } from "@/components/ui/backButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuantityControl } from "@/components/cart/ QuantityControl";

const COLOR_CLASSES: { [key: string]: string } = {
	"Brak koloru": "bg-gray-300 text-gray-800",
	Biały: "bg-white text-gray-800",
	Szary: "bg-gray-500 text-white",
	Czerwony: "bg-red-500 text-white",
	Niebieski: "bg-blue-500 text-white",
	Zielony: "bg-green-500 text-white",
	Żółty: "bg-yellow-500 text-gray-800",
	Pomarańczowy: "bg-orange-500 text-white",
	Brązowy: "bg-brown-500 text-white",
	Różowy: "bg-pink-500 text-white",
	Fioletowy: "bg-purple-500 text-white",
	Beżowy: "bg-beige-500 text-gray-800",
	Czarny: "bg-black text-white",
};

export const ProductDetailsComponent = ({
	product,
	back_link,
}: {
	product: ProductDetails;
	back_link: BackLinkProps;
}) => {
	const searchParams = useSearchParams();
	const variantSlug = searchParams.get("variant");

	const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		const initialVariant = variantSlug
			? product.variants.find((variant) => variant.slug === variantSlug)
			: null;
		setSelectedVariant(initialVariant || null);
	}, [variantSlug, product.variants]);

	const images =
		selectedVariant && selectedVariant.images && selectedVariant.images.length > 0
			? selectedVariant.images
			: product.images.length > 0
				? product.images
				: [
						{
							id: 0,
							image_url: DEFAULT_IMAGE_URL,
							alt: product.name,
							title: product.name,
							width: 650,
							height: 650,
						},
					];

	function onHandleClick(variant?: Variant) {
		if (variant) {
			setSelectedVariant(variant);
			const newUrl = new URL(window.location.href);
			newUrl.searchParams.set("variant", variant.slug);
			window.history.replaceState(null, "", newUrl.toString());
		} else {
			setSelectedVariant(null);
			const newUrl = new URL(window.location.href);
			newUrl.searchParams.delete("variant");
			window.history.replaceState(null, "", newUrl.toString());
		}
		setQuantity(1);
	}

	return (
		<div className="relative flex w-full min-w-full flex-wrap items-start justify-center rounded-lg bg-white shadow-lg">
			<ButtonBack {...back_link} />
			<div className="w-full md:w-2/3">
				<CarouselPlugin images={images} />
			</div>
			<div className="w-full p-4 md:w-1/3">
				<h1 className="mb-2 text-2xl font-bold">{product.name}</h1>
				<span className="mb-4 block text-sm text-gray-500">{product.category.name}</span>
				<p className="mb-4">{product.description}</p>
				<p className="mb-1 text-xl font-semibold">Cena: {formatMoney(product.current_price)}</p>
				<small className="mb-4 block">
					Cena z ostatnich 30 dni: {formatMoney(product.min_price_last_30)}
				</small>
				<QuantityControl
					quantity={quantity}
					setQuantity={setQuantity}
					maxQuantity={selectedVariant ? selectedVariant.qty : product.qty}
				/>
				<p className="mb-4">
					Dostępna ilość: {selectedVariant ? selectedVariant.qty : product.qty}
				</p>

				{product.brand && (
					<p className="mb-2 text-sm">
						<span className="font-semibold">Marka:</span> {product.brand.name}
					</p>
				)}
				{product.material && (
					<p className="mb-2 text-sm">
						<span className="font-semibold">Materiał:</span> {product.material.name}
					</p>
				)}
				{product.size && (
					<p className="mb-2 text-sm">
						<span className="font-semibold">Rozmiar:</span> {product.size.name}
					</p>
				)}
				{product.tags && product.tags.length > 0 && (
					<div className="mb-4">
						<span className="text:sm font-semibold">Tagi:</span>
						<div className="mt-1 flex flex-wrap">
							{product.tags.map((tag) => (
								<span
									key={tag.id}
									className="mb-2 mr-2 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
								>
									{tag.name}
								</span>
							))}
						</div>
					</div>
				)}

				{/* Color Variants */}
				{product.variants.length > 0 && (
					<div className="mb-4">
						<span className="text-sm font-semibold">Warianty koloru:</span>
						<div className="mt-1 flex flex-wrap">
							<Badge
								key={"default"}
								className="mb-2 mr-2 cursor-pointer rounded-full p-2"
								variant={"outline"}
								onClick={() => onHandleClick()}
							>
								{"Domyślny"}
							</Badge>
							{product.variants.map((variant) => (
								<Badge
									key={variant.id}
									className={`mb-2 mr-2 cursor-pointer rounded-full p-2 ${COLOR_CLASSES[variant.color]}`}
									onClick={() => onHandleClick(variant)}
								>
									{variant.name}
								</Badge>
							))}
						</div>
					</div>
				)}

				<Button className="w-full rounded-md text-white transition hover:bg-gray-500">
					Dodaj do koszyka
				</Button>
			</div>
		</div>
	);
};

export default ProductDetailsComponent;
