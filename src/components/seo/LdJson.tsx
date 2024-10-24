import { Thing, ItemList, Product, ListItem, AggregateRating, Article, Service } from "schema-dts";
import {
	ArticleListItem,
	ArticleResponse,
	CategoryDetailsProps,
	MenuItem,
	ProductDetails,
	ProductListItem,
} from "@/app/types";

export const JsonLd = <T extends Thing>({ jsonLd }: { jsonLd: WithContext<T> }) => {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
};

export const mappedProductToJsonLd = (product: ProductDetails): WithContext<Product | Service> => {
	const formattedPrice = product.current_price.toFixed(2);
	const aggregateRating: AggregateRating | undefined = product.review_count
		? {
				"@type": "AggregateRating",
				ratingValue: product.average_rating.toFixed(1),
				reviewCount: product.review_count,
				bestRating: "5",
				worstRating: "1",
			}
		: undefined;

	return {
		"@context": "https://schema.org",
		"@type": product.is_service ? "Service" : "Product",
		"@id": `${process.env.NEXT_PUBLIC_BASE_URL}` + product.full_path,
		url: `${process.env.NEXT_PUBLIC_BASE_URL}` + product.full_path,
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
		aggregateRating,
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
					"@type": product.is_service ? "Service" : "Product",
					"@id": `${process.env.NEXT_PUBLIC_BASE_URL}` + product.full_path,
					url: `${process.env.NEXT_PUBLIC_BASE_URL}` + product.full_path,
					name: product.name,
					image: product.image?.url ?? "",
					offers: {
						"@type": "Offer",
						price: product.current_price,
						priceCurrency: "PLN",
						availability:
							product.qty > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
					},
					aggregateRating: product.average_rating
						? {
								"@type": "AggregateRating",
								ratingValue: product.average_rating.toFixed(1),
								reviewCount: product.review_count,
								bestRating: "5",
								worstRating: "1",
							}
						: undefined,
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
		description: category.meta_description || category.description,
		itemListElement: category.items.map(
			(item, index): ListItem => ({
				"@type": "ListItem",
				position: index + 1,
				item: {
					"@type": "Service",
					"@id": `${process.env.NEXT_PUBLIC_BASE_URL}` + item.full_path,
					url: `${process.env.NEXT_PUBLIC_BASE_URL}` + item.full_path,
					name: item.name,
					description: item.description ?? undefined,
					image: item.image?.url ?? "",
				},
			}),
		),
	};
};

import { WithContext, WebSite, LocalBusiness } from "schema-dts";
import { stripHtmlTags } from "@/utils";

export const ownerWebsiteJsonLd = (): WithContext<WebSite | LocalBusiness> => {
	const logoUrl = `${process.env.API_URL}/media/logo.webp`;

	const websiteSchema: WithContext<WebSite> = {
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
			},
		}),
		publisher: {
			"@type": "Organization",
			name: process.env.NEXT_PUBLIC_SITE_NAME ?? "",
			url: process.env.NEXT_PUBLIC_BASE_URL ?? "",
		},
	};

	const localBusinessSchema: WithContext<LocalBusiness> = {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		name: process.env.NEXT_PUBLIC_SITE_NAME ?? "",
		image: logoUrl,
		"@id": process.env.NEXT_PUBLIC_BASE_URL ?? "",
		url: process.env.NEXT_PUBLIC_BASE_URL ?? "",
		telephone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+48 506 029 980",
		address: {
			"@type": "PostalAddress",
			streetAddress: process.env.NEXT_PUBLIC_STREET_ADDRESS ?? "Wspólna 2",
			addressLocality: process.env.NEXT_PUBLIC_CITY ?? "Rybna",
			addressRegion: process.env.NEXT_PUBLIC_REGION ?? "Małopolskie",
			postalCode: process.env.NEXT_PUBLIC_POSTAL_CODE ?? "",
			addressCountry: process.env.NEXT_PUBLIC_COUNTRY ?? "PL",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: 50.0421112,
			longitude: 19.6403306,
		},
		openingHoursSpecification: [
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
				opens: "08:00",
				closes: "17:00",
			},
			// {
			// 	"@type": "OpeningHoursSpecification",
			// 	dayOfWeek: "Saturday",
			// 	opens: "10:00",
			// 	closes: "14:00",
			// },
		],
		sameAs: [
			process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
			process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
		],
	};

	return {
		...websiteSchema,
		...localBusinessSchema,
	};
};

export const mappedArticlesToJsonLd = (
	articles: readonly ArticleListItem[],
): WithContext<ItemList> => {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		itemListElement: articles.map(
			(article, index): ListItem => ({
				"@type": "ListItem",
				position: index + 1,
				item: {
					"@type": "Article",
					"@id": `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${article.slug}`,
					url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${article.slug}`,
					headline: article.name,
					description: article.description ?? "Brak opisu",
					image: article.image_listing?.url ?? "",
					datePublished: new Date(article.created_date).toISOString(),
				},
			}),
		),
	};
};

export const mappedArticleToJsonLd = (article: ArticleResponse): WithContext<Article> => {
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		"@id": `${process.env.NEXT_PUBLIC_BASE_URL}${article.full_path}`,
		url: `${process.env.NEXT_PUBLIC_BASE_URL}${article.full_path}`,
		headline: article.meta_title || article.name,
		description: article.meta_description || article.description || "Brak opisu",
		articleBody: stripHtmlTags(article.content),
		image: {
			"@type": "ImageObject",
			url: article.image?.url || "",
		},
		datePublished: new Date(article.created_date).toISOString(),
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${process.env.NEXT_PUBLIC_BASE_URL}${article.full_path}`,
		},
		author: {
			"@type": "Person",
			name: "Michał Pielak",
		},
		publisher: {
			"@type": "Organization",
			name: "SerwiswRybnej.pl",
			logo: {
				"@type": "ImageObject",
				url: `${process.env.NEXT_PUBLIC_BASE_URL}/logo-serwiswrybnej-pl.webp`,
			},
		},
	};
};

export const mappedMenuItemsToJsonLd = (
	items: readonly MenuItem[],
	parentCategoryName: string,
	parentCategoryUrl: string,
): WithContext<ItemList> => {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		itemListElement: items.map(
			(item, index): ListItem => ({
				"@type": "ListItem",
				position: index + 1,
				item: {
					"@type": "SiteNavigationElement",
					"@id": `${process.env.NEXT_PUBLIC_BASE_URL}${item.full_path}`,
					url: `${process.env.NEXT_PUBLIC_BASE_URL}${item.full_path}`,
					name: item.item_label,
					image: item.image?.url ?? "",
					isPartOf: {
						"@type": "WebPage",
						"@id": `${process.env.NEXT_PUBLIC_BASE_URL}${parentCategoryUrl}`,
						url: `${process.env.NEXT_PUBLIC_BASE_URL}${parentCategoryUrl}`,
						name: parentCategoryName,
					},
				},
			}),
		),
	};
};

export const mappedMainMenuItemsToJsonLd = (): WithContext<ItemList> => {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				item: {
					"@type": "SiteNavigationElement",
					"@id": `${process.env.NEXT_PUBLIC_BASE_URL}/produkty`,
					url: `${process.env.NEXT_PUBLIC_BASE_URL}/produkty`,
					name: "Produkty",
					isPartOf: {
						"@type": "WebPage",
						"@id": `${process.env.NEXT_PUBLIC_BASE_URL}/`,
						url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
						name: "Strona główna",
					},
				},
			},
			{
				"@type": "ListItem",
				position: 2,
				item: {
					"@type": "SiteNavigationElement",
					"@id": `${process.env.NEXT_PUBLIC_BASE_URL}/uslugi`,
					url: `${process.env.NEXT_PUBLIC_BASE_URL}/uslugi`,
					name: "Usługi",
					isPartOf: {
						"@type": "WebPage",
						"@id": `${process.env.NEXT_PUBLIC_BASE_URL}/`,
						url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
						name: "Strona główna",
					},
				},
			},
			{
				"@type": "ListItem",
				position: 3,
				item: {
					"@type": "SiteNavigationElement",
					"@id": `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
					url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
					name: "Blog",
					isPartOf: {
						"@type": "WebPage",
						"@id": `${process.env.NEXT_PUBLIC_BASE_URL}/`,
						url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
						name: "Strona główna",
					},
				},
			},
			{
				"@type": "ListItem",
				position: 4,
				item: {
					"@type": "SiteNavigationElement",
					"@id": `${process.env.NEXT_PUBLIC_BASE_URL}/kontakt`,
					url: `${process.env.NEXT_PUBLIC_BASE_URL}/kontakt`,
					name: "Kontakt",
					isPartOf: {
						"@type": "WebPage",
						"@id": `${process.env.NEXT_PUBLIC_BASE_URL}/`,
						url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
						name: "Strona główna",
					},
				},
			},
		],
	};
};
