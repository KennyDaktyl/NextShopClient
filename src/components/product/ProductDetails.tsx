"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DEFAULT_IMAGE_URL, formatMoney, trackViewItem } from "@/utils";
import { BackLinkProps, ProductDetails, Variant } from "@/app/types";
import { CarouselPlugin } from "@/components/product/carouselPlugin";
import { ButtonBack } from "@/components/ui/backButton";
import { QuantityControl } from "@/components/cart/QuantityControl";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import VariantsComponent from "@/components/product/atoms/VariantsComponent";
import PriceComponent from "@/components/product/atoms/PriceComponent";
import DescriptionComponent from "@/components/product/atoms/DescriptionComponent";
import TagsComponent from "@/components/product/atoms/TagsComponent";
import AddToCartButton from "@/components/product/atoms/AddToCartButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductOptionComponent } from "@/components/product/ProductOption";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const ProductDetailsComponent = ({
	product,
	back_link,
}: {
	product: ProductDetails;
	back_link: BackLinkProps;
}) => {
	const searchParams = useSearchParams();
	const variantSlug = searchParams.get("variant");

	const [textareaValue, setTextareaValue] = useState("");
	const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
	const [selectedOption, setSelectedOption] = useState<{
		option_id: number;
		value_id: number;
	} | null>(null);
	const [alertSetOption, setAlertSetOption] = useState(false);
	const [initialized, setInitialized] = useState(false);
	const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(1);
	const [isAddedToCart, setIsAddedToCart] = useState(false);

	useEffect(() => {
		const initialVariant = variantSlug
			? product.variants?.find((variant) => variant.slug === variantSlug)
			: null;
		setSelectedVariant(initialVariant || null);
		setInitialized(true);
		setLoading(false);
	}, [variantSlug, product.variants]);

	useEffect(() => {
		if (product) {
			const trackedItem = selectedVariant || product;
			const price = product.current_price;

			trackViewItem({
				item_id: trackedItem.id.toString(),
				item_name: trackedItem.name,
				price: price,
				quantity: 1,
				currency: "PLN",
				category: product.category?.name || "",
				brand: product.brand?.name || "",
				variant: selectedVariant?.name || "",
			});
		}
	}, [product, selectedVariant]);

	const handleOptionSelect = (optionId: number, valueId: number) => {
		setSelectedOption({ option_id: optionId, value_id: valueId });
	};

	const handleAddToCart = () => {
		if (product.product_option && !selectedOption) {
			toast.error(`Wybierz ${product.product_option.name}`, {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setAlertSetOption(true);
			return false;
		}
		setIsAddedToCart(true);
		setAlertSetOption(false);
		setQuantity(1);
		setSelectedOption(null);

		setTimeout(() => setIsAddedToCart(false), 2000);
		return true;
	};

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
							url: DEFAULT_IMAGE_URL,
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
	}

	const cartItemData = {
		product_id: product.id,
		variant_id: selectedVariant ? selectedVariant.id : null,
		quantity: quantity,
		is_available: selectedVariant ? selectedVariant.qty > 0 : product.qty > 0,
		selected_option: selectedOption || undefined,
		info: textareaValue || undefined,
	};

	return (
		<div className="relative flex w-full min-w-full flex-wrap items-start justify-center rounded-lg bg-white shadow-lg">
			<ButtonBack {...back_link} />
			<div className="w-full pb-1 pt-1 md:w-2/3">
				<CarouselPlugin images={images} />
			</div>

			<div className="w-full p-4 md:w-1/3">
				{product.h1_tag && (
					<p className="g mb-4 w-full text-left font-bold uppercase">{product.name}</p>
				)}
				<TooltipProvider>
					{product.variants && product.show_variant_label && (
						<VariantsComponent
							variants={product.variants || []}
							selectedVariant={selectedVariant}
							label={product.variant_label}
							onHandleClick={onHandleClick}
						/>
					)}
				</TooltipProvider>
				{selectedVariant && <p className="mb-4 text-sm">Wybrany wariant: {selectedVariant.name}</p>}
				{product.product_option && (
					<ProductOptionComponent
						productOption={product.product_option}
						onOptionSelect={handleOptionSelect}
						onAddToCartSuccess={isAddedToCart}
						alertSetOption={alertSetOption}
					/>
				)}
				<div className="mb-2 text-sm">
					<span className="font-semibold">Kategoria:</span> {product.category.name}
				</div>
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
					<div className="mb-2 flex flex-wrap text-sm">
						<TagsComponent tags={tags} />
					</div>
				)}
				<PriceComponent
					currentPrice={product.current_price}
					minPriceLast30={product.min_price_last_30}
				/>
				{product.free_delivery || product.free_delivery_threshold_passed ? (
					<div className="mb-2 text-sm">
						<span className="font-semibold text-blue-500">*Darmowa dostawa</span>
					</div>
				) : (
					product.free_delivery_threshold && (
						<div className="mb-2 text-sm">
							<span className="font-semibold text-red-500">
								Zamów za minimum {formatMoney(product.free_delivery_threshold)} zł, aby otrzymać
								darmową przesyłkę!
							</span>
						</div>
					)
				)}
				<div className="mb-1 text-xs sm:mb-4">
					Dostępna ilość: {selectedVariant ? selectedVariant.qty : product.qty}
				</div>
				{cartItemData.is_available ? (
					<p className="mb-2 text-sm text-green-500">Produkt dostępny</p>
				) : (
					<div>
						<p className="mb-2 text-sm text-red-500">Produkt niedostępny</p>
						{product.variants && (
							<p className="mb-2 text-sm text-green-500">Sprawdź inny wariant!</p>
						)}
					</div>
				)}
				{cartItemData.is_available && (
					<QuantityControl
						quantity={quantity}
						setQuantity={setQuantity}
						maxQuantity={selectedVariant ? selectedVariant.qty : product.qty}
					/>
				)}
				<AddToCartButton cartItemData={cartItemData} onAddedToCart={handleAddToCart} />
				<div className="mb-4 mt-4">
					<Label htmlFor="info" className="mb-1 text-sm font-semibold">
						Wiadomość <span className="text-red-500">*</span>
					</Label>
					<Textarea
						id="info"
						maxLength={255}
						className="mt-1 block w-full rounded-md border p-2"
						rows={5}
						value={textareaValue}
						onChange={(e) => setTextareaValue(e.target.value)}
					/>
				</div>
				{product.description && (
					<DescriptionComponent title="Opis produktu" description={product.description} />
				)}
			</div>
			{product.seo_text && (
				<DescriptionComponent title="Szczegóły produktu" description={product.seo_text} />
			)}
		</div>
	);
};

export default ProductDetailsComponent;
