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

/**
 * Funkcja do śledzenia zakupu produktu w Google Analytics 4
 * @param transactionId - ID transakcji
 * @param value - Całkowita kwota transakcji
 * @param currency - Waluta transakcji (np. "PLN", "USD")
 * @param paymentMethod - Metoda płatności (opcjonalne)
 * @param products - Lista produktów kupionych, zawierająca id, nazwę, kategorię, ilość, cenę
 */
export const trackPurchase = (
	transactionId: string,
	value: number,
	currency: string,
	paymentMethod: string,
	products: Array<{
		id: string;
		name: string;
		category: string;
		quantity: number;
		price: number;
	}>,
) => {
	const eventData = {
		transaction_id: transactionId,
		value: value,
		currency: currency,
		payment_method: paymentMethod,
		items: products.map((product) => ({
			item_id: product.id,
			item_name: product.name,
			item_category: product.category,
			quantity: product.quantity,
			price: product.price,
		})),
	};

	// Wyślij zdarzenie purchase do Google Analytics
	gtagEvent("purchase", eventData);
};
