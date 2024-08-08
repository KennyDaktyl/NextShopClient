import type { ProductListItem } from "@/app/types";

export const formatMoney = (amount: number) => {
	return new Intl.NumberFormat("pl-PL", {
		style: "currency",
		currency: "PLN",
	}).format(amount);
};

export const DEFAULT_IMAGE_URL = "/images/no-image.webp";

export const getProductImage = (product: ProductListItem, width: number, height: number) => {
	if (product.image) {
		return {
			url: product.image.url,
			width: product.image.width,
			height: product.image.height,
			alt: product.image.alt || product.name,
			title: product.image.title || product.name,
		};
	}

	return {
		url: DEFAULT_IMAGE_URL,
		width: width,
		height: height,
		alt: product.name,
		title: product.name,
	};
};
