import type { Metadata } from "next";
import Link from "next/link";
import { Stamp } from "lucide-react";
import { getCategoryMetaData } from "@/api/getCategoryMetaData";
import { getMenuItems } from "@/api/getMenuItems";
import { getProductsByCategory } from "@/api/getProductsByCategory";
import { MenuItemsResponse, ProductListItem, ProductsResponse } from "@/app/types";
import { generateCategoryJsonLd, JsonLd, mappedProductsToJsonLd } from "@/components/seo/LdJson";
import MobileServiceAreaGrid, { AreaCard } from "@/components/mobile-services/MobileServiceAreaGrid";
import MobileServiceContactBar from "@/components/mobile-services/MobileServiceContactBar";
import MobileServiceCrossLink from "@/components/mobile-services/MobileServiceCrossLink";
import StampDesigner from "@/components/widgets/StampDesigner/StampDesigner";
import { formatMoney } from "@/utils";

const CATEGORY_SLUG = "mobilne-wyrob-pieczatek";
const DEFAULT_MIN_ORDER_VALUE = 100;
const DEFAULT_WHOLESALE_QTY = 10;
const DEFAULT_WHOLESALE_DISCOUNT = 15;
const DEFAULT_DELIVERY_TIME_HOURS = 2;

const AREA_CARDS: AreaCard[] = [
	{ town: "Kraków — Śródmieście", phrase: "Wyrób pieczątek ekspresowo z dojazdem" },
	{ town: "Podgórze", phrase: "Pieczątki firmowe z dostawą do biura" },
	{ town: "Nowa Huta", phrase: "Pieczątki na miejscu, tego samego dnia" },
	{ town: "Krowodrza", phrase: "Pieczątki firmowe na dojeździe" },
	{ town: "Zabierzów", phrase: "Wyrób pieczątek z dojazdem do klienta" },
	{ town: "Zielonki", phrase: "Pieczątki imienne i firmowe na miejscu" },
	{ town: "Skawina", phrase: "Ekspresowy wyrób pieczątek z dostawą" },
	{ town: "Wieliczka", phrase: "Pieczątki z dojazdem do biura lub domu" },
	{ town: "Krzeszowice", phrase: "Wyrób pieczątek z dojazdem" },
	{ town: "Liszki", phrase: "Pieczątki na zamówienie z dostawą" },
	{ town: "Kryspinów", phrase: "Ekspresowe pieczątki z dojazdem" },
	{ town: "Alwernia", phrase: "Wyrób pieczątki na miejscu" },
];

export async function generateMetadata(): Promise<Metadata> {
	const category = await getCategoryMetaData({ currentCategorySlug: CATEGORY_SLUG });

	const title = category.meta_title || "Wyrób pieczątek ekspresowo z dojazdem do klienta — Kraków";
	const description =
		category.meta_description ||
		"Pieczątki firmowe, imienne i samotuszujące z dostawą do domu lub biura w Krakowie i okolicy.";

	return {
		title,
		description,
		alternates: { canonical: category.full_path || `/uslugi/${CATEGORY_SLUG}` },
		openGraph: {
			title,
			description,
			url: process.env.NEXT_PUBLIC_BASE_URL + (category.full_path || `/uslugi/${CATEGORY_SLUG}`),
			siteName: process.env.NEXT_PUBLIC_SITE_TITLE,
			locale: "pl_PL",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
	};
}

export default async function MobileStampsPage() {
	const menuItems: MenuItemsResponse = await getMenuItems({ categorySlug: CATEGORY_SLUG });
	const productsResponse = await getProductsByCategory({
		categorySlug: CATEGORY_SLUG,
		params: { page: "1" },
	});

	const products: ProductListItem[] =
		productsResponse &&
		typeof productsResponse === "object" &&
		"results" in (productsResponse as ProductsResponse)
			? (productsResponse as ProductsResponse).results
			: [];

	const settings = menuItems.mobile_service_settings;
	const minOrderValue = settings?.min_stamp_order_value ?? DEFAULT_MIN_ORDER_VALUE;
	const wholesaleQty = settings?.wholesale_qty ?? DEFAULT_WHOLESALE_QTY;
	const wholesaleDiscount = settings?.wholesale_discount_percent ?? DEFAULT_WHOLESALE_DISCOUNT;
	const deliveryTimeHours = settings?.delivery_time_hours ?? DEFAULT_DELIVERY_TIME_HOURS;

	return (
		<div className="mb-10 w-full">
			<section className="rounded-lg bg-gray-100 p-6 sm:p-10">
				<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
					<div>
						<h1 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl">
							{menuItems.h1_tag || "Wyrób pieczątek ekspresowo z dojazdem do klienta"}
						</h1>
						<p className="mb-5 text-base leading-relaxed text-gray-700">
							Pieczątki firmowe, imienne i samotuszujące projektujemy i wykonujemy tego samego
							dnia, z dostawą prosto do Ciebie — do domu lub biura. Dojazd na terenie Krakowa i
							okolic w ciągu {deliveryTimeHours} {deliveryTimeHours === 1 ? "godziny" : "godzin"}{" "}
							od zatwierdzenia projektu.
						</p>
						<div className="flex flex-wrap gap-3">
							<a
								href={`tel:+48${settings?.phone_number || "506029980"}`}
								className="rounded-md bg-gray-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
							>
								Zadzwoń: {(settings?.phone_number || "506029980").replace(/(\d{3})(?=\d)/g, "$1 ")}
							</a>
							<a
								href={settings?.whatsapp_url || "https://wa.me/48506029980"}
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-md bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1ea952]"
							>
								WhatsApp
							</a>
						</div>
					</div>
					<div className="relative flex h-[220px] w-full items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-gray-800 shadow-lg sm:h-[280px]">
						<Stamp className="h-20 w-20 text-white" aria-hidden="true" />
					</div>
				</div>
			</section>

			<section className="mt-8 rounded-lg border border-gray-200 p-6 sm:p-8">
				<h2 className="mb-1 text-xl font-semibold sm:text-2xl">Zaprojektuj pieczątkę online</h2>
				<p className="mb-5 text-sm text-gray-600">
					Zbuduj treść pieczątki linia po linii i wyślij projekt do wyceny — bez wychodzenia z domu.
				</p>
				<StampDesigner variant="embedded" />
			</section>

			<MobileServiceContactBar
				title="Zamów pieczątkę z dojazdem"
				phoneNumber={settings?.phone_number}
				whatsappUrl={settings?.whatsapp_url}
				messengerUrl={settings?.messenger_url}
			/>

			{products.length > 0 && (
				<section className="mt-8">
					<h2 className="mb-5 text-xl font-semibold sm:text-2xl">Pieczątki — wybierz rodzaj</h2>
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{products.map((product) => (
							<Link
								key={product.id}
								href={product.full_path}
								className="rounded-lg border border-gray-200 p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
							>
								<h3 className="mb-2 text-base font-semibold">{product.name}</h3>
								<p className="mb-3 text-sm leading-relaxed text-gray-600">{product.description}</p>
								<div className="text-sm font-bold">od {formatMoney(product.current_price)}</div>
							</Link>
						))}
					</div>
				</section>
			)}

			<section className="mt-8 rounded-lg bg-gray-100 p-6 sm:p-8">
				<h2 className="mb-1 text-xl font-semibold sm:text-2xl">Cennik i warunki dojazdu</h2>
				<p className="mb-5 text-sm text-gray-500">Stawki edytowalne z panelu administracyjnego.</p>

				<div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
					<div className="rounded-lg bg-white p-5 shadow-sm">
						<div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
							Minimalna wartość zamówienia z dojazdem
						</div>
						<div className="text-xl font-bold">od {formatMoney(minOrderValue)}</div>
						<p className="mt-2 text-sm text-gray-600">Poniżej tej kwoty doliczamy opłatę za dojazd.</p>
					</div>
					<div className="rounded-lg bg-white p-5 shadow-sm">
						<div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
							Cena hurtowa / stała współpraca
						</div>
						<div className="text-xl font-bold">
							od {wholesaleQty} szt. — rabat {wholesaleDiscount}%
						</div>
						<p className="mt-2 text-sm text-gray-600">
							Dla biur, kancelarii i firm o stałej współpracy — indywidualny cennik na zapytanie.
						</p>
					</div>
				</div>

				{products.length > 0 && (
					<div className="overflow-hidden rounded-lg bg-white">
						{products.map((product) => (
							<div
								key={product.id}
								className="flex items-center justify-between border-b border-gray-200 px-5 py-4 last:border-b-0"
							>
								<span className="text-sm font-medium">{product.name}</span>
								<span className="text-sm font-bold">od {formatMoney(product.current_price)}</span>
							</div>
						))}
						<div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
							<span className="text-sm font-medium">
								Dojazd przy zamówieniu poniżej {formatMoney(minOrderValue)}
							</span>
							<span className="text-sm font-bold">opłata dodatkowa — zapytaj</span>
						</div>
						<div className="flex items-center justify-between px-5 py-4">
							<span className="text-sm font-medium">
								Zamówienia hurtowe (od {wholesaleQty} szt.) / stała współpraca B2B
							</span>
							<span className="text-sm font-bold">
								rabat od {wholesaleDiscount}% — wycena indywidualna
							</span>
						</div>
					</div>
				)}
			</section>

			<MobileServiceAreaGrid
				title="Obszar działania — mobilne pieczątki w Krakowie i okolicy"
				description={
					menuItems.seo_text ||
					`Wyrób pieczątek ekspresowo z dojazdem do klienta świadczymy na terenie Krakowa i okolicznych miejscowości. Projekt akceptujesz zdalnie, a gotową pieczątkę dostarczamy do ${deliveryTimeHours} ${deliveryTimeHours === 1 ? "godziny" : "godzin"} — bez wizyty w punkcie w Rybnej.`
				}
				areas={AREA_CARDS}
			/>

			<MobileServiceCrossLink href="/uslugi/mobilne-dorabianie-kluczy" label="Mobilne dorabianie kluczy" />

			<JsonLd
				jsonLd={generateCategoryJsonLd({
					name: menuItems.name,
					meta_title: menuItems.meta_title,
					meta_description: menuItems.meta_description,
					description: menuItems.description || "",
					seo_text: menuItems.seo_text || "",
					image: menuItems.image,
					items: menuItems.items,
				})}
			/>
			{products.length > 0 && <JsonLd jsonLd={mappedProductsToJsonLd(products)} />}
		</div>
	);
}
