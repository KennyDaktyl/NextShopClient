"use client";

import { startTransition, useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { DEFAULT_IMAGE_URL } from "@/utils";
import { BackLinkProps, ProductDetails, Variant } from "@/app/types";
import { CarouselPlugin } from "@/components/product/carouselPlugin";
import { ButtonBack } from "@/components/ui/backButton";
import { QuantityControl } from "@/components/cart/QuantityControl";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import ColorVariantsComponent from "@/components/product/atoms/ColorVariantsComponent";
import PriceComponent from "@/components/product/atoms/PriceComponent";
import DescriptionComponent from "@/components/product/atoms/DescriptionComponent";
import HeaderComponent from "@/components/product/atoms/HeaderComponent";
import TagsComponent from "@/components/product/atoms/TagsComponent";
import { addToCartAction } from "@/app/cart/actions";
import { useFormStatus } from 'react-dom';
import AddToCartButton from "@/components/product/atoms/AddToCartButton";

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
	const [initialized, setInitialized] = useState(false);
	const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		const initialVariant = variantSlug
			? product.variants?.find((variant) => variant.slug === variantSlug)
			: null;
		setSelectedVariant(initialVariant || null);
		setInitialized(true);
		setLoading(false);
	}, [variantSlug, product.variants]);

	if (!initialized) {
		return null;
	}

	if (loading) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<p>Loading...</p>
			</div>
		);
	}

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
	const tags =
		selectedVariant && selectedVariant.tags && selectedVariant.tags.length > 0
			? selectedVariant.tags
			: product.tags;

	function onHandleClick(variant: Variant) {
		if (!variant.is_main) {
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

	const handleAddToCart = () => {
		setQuantity(1);
	};

	const formData = new FormData();
	formData.append("product_id", product.id.toString());
	formData.append("variant_id", selectedVariant ? selectedVariant.id.toString() : '');
	formData.append("quantity", quantity.toString());

	return (
		<div className="relative flex w-full min-w-full flex-wrap items-start justify-center rounded-lg bg-white shadow-lg">
			<ButtonBack {...back_link} />
			<div className="w-full md:w-2/3">
				<CarouselPlugin images={images} />
			</div>

			<div className="w-full p-4 md:w-1/3">
				<HeaderComponent product={product} />
				<DescriptionComponent description={product.description} />
				<TooltipProvider>
					{product.variants && product.show_variant_label && (
						<ColorVariantsComponent
							variants={product.variants || []}
							label={product.variant_label}
							onHandleClick={onHandleClick}
						/>
					)}
				</TooltipProvider>
				{product.brand && (
					<div className="mb-2 text-sm">
						<span className="font-semibold">Marka:</span> {product.brand.name}
					</div>
				)}
				{product.material && (
					<div className="mb-2 text-sm">
						<span className="font-semibold">Materiał:</span> {product.material.name}
					</div>
				)}
				{product.size && (
					<div className="mb-2 text-sm">
						<span className="font-semibold">Rozmiar:</span> {product.size.name}
					</div>
				)}
				{tags && tags.length > 0 && (
					<div className="mb-2 text-sm">
						<TagsComponent tags={tags} />
					</div>
				)}
				<div className="mb-1 sm:mb-4">
					Dostępna ilość: {selectedVariant ? selectedVariant.qty : product.qty}
				</div>
				<PriceComponent
					currentPrice={product.current_price}
					minPriceLast30={product.min_price_last_30}
				/>
				<QuantityControl
					quantity={quantity}
					setQuantity={setQuantity}
					maxQuantity={selectedVariant ? selectedVariant.qty : product.qty}
				/>
				<AddToCartButton formData={formData} onAddedToCart={handleAddToCart} />
			</div>
		</div>
	);
};

export default ProductDetailsComponent;
