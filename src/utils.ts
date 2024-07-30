import type { ProductListItem } from "@/app/types";

export const formatMoney = (amount: number) => {
	return new Intl.NumberFormat("pl-PL", {
		style: "currency",
		currency: "PLN",
	}).format(amount);
};

export const DEFAULT_IMAGE_URL = "/images/no-image.webp";

export const getProductImage = (product: ProductListItem, width: number, height: number) => {
	if (product.image_list_item) {
		return {
			url: product.image_list_item.image_url,
			width: product.image_list_item.width,
			height: product.image_list_item.height,
			alt: product.image_list_item.alt || product.name,
			title: product.image_list_item.title || product.name,
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
