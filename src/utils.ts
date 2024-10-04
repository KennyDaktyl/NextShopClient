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

export const handlePdfOpen = (pdfUrl: string) => {
	window.open(pdfUrl, "_blank");
};

declare global {
	interface Window {
		gtag?: (event: string, action: string, data: any) => void;
	}
}

/**
 * Funkcja do wysyłania zdarzeń do Google Analytics 4
 * @param eventName - Nazwa zdarzenia (np. "add_to_cart", "order_placed")
 * @param eventData - Dane powiązane z tym zdarzeniem (np. ID produktu, ilość, dostępność)
 */
export const gtagEvent = (eventName: string, eventData: Record<string, any>) => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("event", eventName, eventData);
	}
};

export const trackPurchase = (
	transactionId: string,
	value: number,
	currency: string,
	products: Array<{
		item_id: number;
		item_name: string;
		quantity: number;
		price: number;
	}>,
) => {
	const eventData = {
		transaction_id: transactionId,
		value: value,
		currency: currency,
		items: products.map((product) => ({
			item_id: product.item_id,
			item_name: product.item_name,
			quantity: product.quantity,
			price: product.price,
		})),
	};
	if (process.env.NODE_ENV === "production") {
		gtagEvent("purchase", eventData);
	} else {
		console.log("purchase", eventData);
	}
};

export const trackViewItem = ({
	item_id,
	item_name,
	price,
	quantity,
	currency,
	category,
	brand,
	variant,
}: {
	item_id: string;
	item_name: string;
	price: number;
	quantity: number;
	currency: string;
	category?: string;
	brand?: string;
	variant?: string;
}) => {
	const eventData = {
		currency: currency,
		value: price * quantity,
		items: [
			{
				item_id: item_id,
				item_name: item_name,
				price: price,
				item_category: category,
				item_brand: brand,
				item_variant: variant,
			},
		],
	};
	if (process.env.NODE_ENV === "production") {
		gtagEvent("view_item", eventData);
	} else {
		console.log("view_item", eventData);
	}
};
