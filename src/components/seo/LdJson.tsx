import { Thing, WithContext, ItemList, Product, ListItem, ImageObject, WebSite } from "schema-dts";
import { CategoryDetailsProps, MappedProduct, ProductDetails, ProductListItem } from "@/app/types";

export const JsonLd = <T extends Thing>({ jsonLd }: { jsonLd: WithContext<T> }) => {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
};

export const mappedProductToJsonLd = (product: ProductDetails): WithContext<Product> => {
	const formattedPrice = product.current_price.toFixed(2);

	return {
		"@context": "https://schema.org",
		"@type": "Product",
		name: product.name,
		image: {
			"@type": "ImageObject",
			url: product.images?.[0]?.url ?? "",
		},
		description: product.description ?? undefined,
		category: product.category.name,
		sku: product.id.toString(),
		offers: {
			"@type": "Offer",
			price: formattedPrice,
			priceCurrency: "PLN",
			availability:
				product.qty > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
		},
	};
};

export const mappedProductsToJsonLd = (
	products: readonly ProductListItem[],
): WithContext<ItemList> => {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		itemListElement: products.map(
			(product, index): ListItem => ({
				"@type": "ListItem",
				position: index + 1,
				item: {
					"@type": "Product",
					"@id": product.absolute_url,
					name: product.name,
					image: product.image?.url ?? "",
					offers: {
						"@type": "Offer",
						price: product.current_price,
						priceCurrency: "PLN",
						availability:
							product.qty > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
					},
				},
			}),
		),
	};
};

export const generateCategoryJsonLd = (category: CategoryDetailsProps): WithContext<ItemList> => {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: category.name,
		description: category.description,
		itemListElement: category.items.map(
			(item, index): ListItem => ({
				"@type": "ListItem",
				position: index + 1,
				item: {
					"@type": "Thing", // Możesz użyć bardziej specyficznego typu, jeśli pasuje
					"@id": item.full_path,
					name: item.name,
					description: item.description,
					image: item.image?.url ?? "", // Obsługa braku obrazu
				},
			}),
		),
	};
};

export const ownerWebsiteJsonLd = (): WithContext<WebSite> => {
	const logoUrl = `${process.env.API_URL}/media/logo.webp`;

	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: process.env.NEXT_PUBLIC_SITE_NAME ?? "",
		url: process.env.NEXT_PUBLIC_BASE_URL ?? "",
		description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? "",
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": process.env.NEXT_PUBLIC_BASE_URL ?? "",
			name: process.env.NEXT_PUBLIC_SITE_TITLE ?? "",
			description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
		},
		...(logoUrl && {
			image: {
				"@type": "ImageObject",
				url: logoUrl,
			} as ImageObject,
		}),
		publisher: {
			"@type": "Organization",
			name: process.env.NEXT_PUBLIC_SITE_NAME ?? "",
			url: process.env.NEXT_PUBLIC_BASE_URL ?? "",
		},
	};
};
