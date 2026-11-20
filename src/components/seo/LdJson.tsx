import {
	Thing,
	ItemList,
	Product,
	ListItem,
	AggregateRating,
	Article,
	Service,
	Graph,
	Offer,
	Place,
	AdministrativeArea,
	City,
	BreadcrumbList,
	CollectionPage,
} from "schema-dts";
import {
	ArticleListItem,
	ArticleResponse,
	CategoryDetailsProps,
	MenuItem,
	ProductDetails,
	ProductListItem,
	ServiceLocality,
} from "@/app/types";
import {
	CAR_KEY_PRICE,
	FLAT_KEY_PRICE,
	REMOTE_CODING_PRICE,
	STAMP_PRICE,
} from "@/components/mobile-services/prices";
import { BUSINESS_NAME } from "@/components/seo/businessInfo";

// Marka „Zamiennik” to nie producent – w danych strukturalnych jej nie podajemy.
const REPLACEMENT_BRAND_SLUG = "zamiennik";

const plainText = (html: string): string => stripHtmlTags(html).replace(/\s+/g, " ").trim();

export const JsonLd = ({ jsonLd }: { jsonLd: WithContext<Thing> | Graph }) => {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
};

export const mappedProductToJsonLd = (product: ProductDetails): WithContext<Product | Service> => {
	const formattedPrice = product.current_price.toFixed(2);
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}` + product.full_path;
	const aggregateRating: AggregateRating | undefined = product.review_count
		? {
				"@type": "AggregateRating",
				ratingValue: product.average_rating.toFixed(1),
				reviewCount: product.review_count,
				bestRating: "5",
				worstRating: "1",
			}
		: undefined;
	const brandName =
		product.brand && product.brand.slug !== REPLACEMENT_BRAND_SLUG ? product.brand.name : undefined;
	const description =
		product.short_description || (product.description ? plainText(product.description) : undefined);
	const images = (product.images ?? []).map((image) => image.url).filter(Boolean);
	const gtin13 = product.gtin && /^\d{13}$/.test(product.gtin) ? product.gtin : undefined;

	return {
		"@context": "https://schema.org",
		"@type": product.is_service ? "Service" : "Product",
		"@id": url,
		url,
		name: product.name,
		image: images.length > 0 ? images : undefined,
		description,
		category: product.category.name,
		sku: product.sku || product.id.toString(),
		...(gtin13 ? { gtin13 } : {}),
		...(brandName ? { brand: { "@type": "Brand", name: brandName } } : {}),
		offers: {
			"@type": "Offer",
			url,
			price: formattedPrice,
			priceCurrency: "PLN",
			availability:
				product.qty > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
			...(product.is_service ? {} : { itemCondition: "https://schema.org/NewCondition" }),
			seller: { "@type": "Organization", name: BUSINESS_NAME },
		},
		aggregateRating,
	} as WithContext<Product | Service>;
};

/** Strona główna › kategorie (z backendu) › produkt. */
export const productBreadcrumbsJsonLd = (product: ProductDetails): WithContext<BreadcrumbList> => {
	const base = `${process.env.NEXT_PUBLIC_BASE_URL}`;
	const categories = product.category.breadcrumbs ?? [
		{ name: product.category.name, full_path: product.category.full_path },
	];
	const crumbs = [
		{ name: "Strona główna", url: `${base}/` },
		...categories.map((category) => ({ name: category.name, url: base + category.full_path })),
		{ name: product.name, url: base + product.full_path },
	];
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: crumbs.map(
			(crumb, index): ListItem => ({
				"@type": "ListItem",
				position: index + 1,
				name: crumb.name,
				item: crumb.url,
			}),
		),
	};
};

/** Strona kategorii z listą produktów: CollectionPage z ItemList jako mainEntity. */
export const categoryCollectionPageJsonLd = (
	category: {
		name: string;
		h1_tag?: string | null;
		meta_description?: string | null;
		description?: string | null;
		full_path: string;
	},
	products: readonly ProductListItem[],
): WithContext<CollectionPage> => {
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}` + category.full_path;
	const { "@context": _context, ...itemList } = mappedProductsToJsonLd(products);
	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		"@id": url,
		url,
		name: category.h1_tag || category.name,
		description: category.meta_description || category.description || undefined,
		mainEntity: itemList as ItemList,
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

import { WithContext, WebSite, Locksmith } from "schema-dts";
import { stripHtmlTags } from "@/utils";

const serviceOffer = (name: string, url: string, price: number): Offer => ({
	"@type": "Offer",
	itemOffered: {
		"@type": "Service",
		name,
		url: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
	},
	priceSpecification: {
		"@type": "PriceSpecification",
		price,
		minPrice: price,
		priceCurrency: "PLN",
	},
});

export const ownerWebsiteJsonLd = (localities: readonly ServiceLocality[]): Graph => {
	const logoUrl = `${process.env.API_URL}/media/logo.webp`;
	const businessId = `${process.env.NEXT_PUBLIC_BASE_URL}/#firma`;

	const websiteSchema: WebSite = {
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
		publisher: { "@id": businessId },
	};

	const areaServed: (City | AdministrativeArea | Place)[] = [
		{ "@type": "City", name: "Kraków" },
		{ "@type": "AdministrativeArea", name: "Gmina Czernichów" },
		...localities.map(
			(locality): Place => ({
				"@type": "Place",
				name: locality.name,
				containedInPlace: { "@type": "AdministrativeArea", name: locality.region_label },
			}),
		),
	];

	const sameAs = [
		process.env.NEXT_PUBLIC_FACEBOOK_URL,
		process.env.NEXT_PUBLIC_INSTAGRAM_URL,
		process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL,
	].filter((url): url is string => Boolean(url));

	const localBusiness: Locksmith = {
		"@type": "Locksmith",
		"@id": businessId,
		name: "Serwis w Rybnej",
		description:
			"Dorabianie kluczy mieszkaniowych i samochodowych, programowanie i dorabianie pilotów do bram, wyrób pieczątek. Punkt w Rybnej (gmina Czernichów) lub dojazd do klienta – Kraków i okolice.",
		image: logoUrl,
		url: process.env.NEXT_PUBLIC_BASE_URL ?? "",
		telephone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+48 506 029 980",
		priceRange: `od ${FLAT_KEY_PRICE} zł`,
		address: {
			"@type": "PostalAddress",
			streetAddress: process.env.NEXT_PUBLIC_STREET_ADDRESS || "Wspólna 2",
			addressLocality: process.env.NEXT_PUBLIC_CITY || "Rybna",
			addressRegion: process.env.NEXT_PUBLIC_REGION || "Małopolskie",
			postalCode: process.env.NEXT_PUBLIC_POSTAL_CODE || "32-061",
			addressCountry: process.env.NEXT_PUBLIC_COUNTRY || "PL",
		},
		areaServed,
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Usługi",
			itemListElement: [
				serviceOffer(
					"Dorabianie kluczy mieszkaniowych",
					"/uslugi/mobilne-dorabianie-kluczy",
					FLAT_KEY_PRICE,
				),
				serviceOffer(
					"Klucze samochodowe z immobilizerem",
					"/uslugi/mobilne-dorabianie-kluczy",
					CAR_KEY_PRICE,
				),
				serviceOffer(
					"Piloty do bram",
					"/uslugi/mobilne-kodowanie-pilotow-do-bram",
					REMOTE_CODING_PRICE,
				),
				serviceOffer("Wyrób pieczątek", "/uslugi/mobilne-wyrob-pieczatek", STAMP_PRICE),
			],
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
		...(sameAs.length > 0 && { sameAs }),
	};

	// schema-dts nie typuje wielu @type naraz – pola sprawdza typ Locksmith powyżej.
	const localBusinessSchema = {
		...localBusiness,
		"@type": ["LocalBusiness", "Locksmith"],
	} as unknown as Locksmith;

	return {
		"@context": "https://schema.org",
		"@graph": [websiteSchema, localBusinessSchema],
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
