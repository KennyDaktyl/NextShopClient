"use client";

import { useEffect, useState } from "react";
import { ProductDetails, Variant } from "@/app/types";
import { DEFAULT_IMAGE_URL } from "@/utils";
import { CarouselPlugin } from "@/components/product/carouselPlugin";

const ProductImage = ({ product }: { product: ProductDetails }) => {
	const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
	const [images, setImages] = useState(product.images);

	useEffect(() => {
		if (selectedVariant && selectedVariant.images && selectedVariant.images.length > 0) {
			setImages(selectedVariant.images);
		} else {
			setImages(
				product.images.length > 0
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
						],
			);
		}
	}, [selectedVariant, product.images]);

	return <CarouselPlugin images={images} />;
};

export default ProductImage;
