"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DEFAULT_IMAGE_URL } from "@/utils";
import { BackLinkProps, ProductDetails, Variant } from "@/app/types";
import { CarouselPlugin } from "@/components/product/carouselPlugin";
import { ButtonBack } from "@/components/ui/backButton";
import { Button } from "@/components/ui/button";
import { QuantityControl } from "@/components/cart/ QuantityControl";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import ColorVariantsComponent from "@/components/product/atoms/ColorVariantsComponent";
import PriceComponent from "@/components/product/atoms/PriceComponent";
import DescriptionComponent from "@/components/product/atoms/DescriptionComponent";
import HeaderComponent from "@/components/product/atoms/HeaderComponent";
import TagsComponent from "@/components/product/atoms/TagsComponent";

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
			? product.variants?.find((variant) => variant.slug === variantSlug)
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
				<HeaderComponent product={product} />
				<DescriptionComponent description={product.description} />
				<PriceComponent
					currentPrice={product.current_price}
					minPriceLast30={product.min_price_last_30}
				/>
				<TooltipProvider>
					{product.variants && (
						<ColorVariantsComponent
							variants={product.variants || []}
							onHandleClick={onHandleClick}
						/>
					)}
				</TooltipProvider>
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
				{product.tags && product.tags.length > 0 && <TagsComponent tags={product.tags} />}
				<Button className="w-full rounded-md text-white transition hover:bg-gray-500">
					Dodaj do koszyka
				</Button>
			</div>
		</div>
	);
};

export default ProductDetailsComponent;
