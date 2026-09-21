import type { Metadata } from "next";
import Link from "next/link";
import { getCategoryMetaData } from "@/api/getCategoryMetaData";
import { getMenuItems } from "@/api/getMenuItems";
import { getProductsByCategory } from "@/api/getProductsByCategory";
import { getServiceLocalities } from "@/api/getServiceLocalities";
import { MenuItemsResponse, ProductListItem, ProductsResponse } from "@/app/types";
import { generateCategoryJsonLd, JsonLd, mappedProductsToJsonLd } from "@/components/seo/LdJson";
import MobileServiceAreaGrid, { AreaCard } from "@/components/mobile-services/MobileServiceAreaGrid";
import MobileServiceContactBar from "@/components/mobile-services/MobileServiceContactBar";
import MobileServiceCrossLink from "@/components/mobile-services/MobileServiceCrossLink";
import { formatMoney } from "@/utils";

const CATEGORY_SLUG = "mobilne-kodowanie-pilotow-do-bram";
const DEFAULT_DELIVERY_TIME_HOURS = 2;
const REMOTE_CODING_PRICE = 199;

export async function generateMetadata(): Promise<Metadata> {
	const category = await getCategoryMetaData({ currentCategorySlug: CATEGORY_SLUG });

	const title = category.meta_title || "Kodowanie Pilotów do Bram - Usługa z Dojazdem";
	const description =
		category.meta_description ||
		"Kodowanie nowego pilota do bramy, szlabanu lub garażu z dojazdem do klienta. Kraków i okolice.";

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

export default async function MobileGateRemotesPage() {
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
	const deliveryTimeHours = settings?.delivery_time_hours ?? DEFAULT_DELIVERY_TIME_HOURS;

	const localities = await getServiceLocalities();
	const areaCards: AreaCard[] = localities.map((locality) => ({
		town: locality.name,
		phrase: `Kodowanie pilota do bramy z dojazdem — ${locality.region_label}`,
		href: `/uslugi/${CATEGORY_SLUG}-${locality.slug}`,
	}));

	return (
		<div className="mb-10 w-full">
			<section className="rounded-lg bg-gray-100 p-6 sm:p-10">
				<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
					<div>
						<h1 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl">
							{menuItems.h1_tag || "Kodowanie Pilotów do Bram z Dojazdem do Klienta"}
						</h1>
						<p className="mb-5 text-base leading-relaxed text-gray-700">
							Nowy pilot do bramy wjazdowej, garażowej lub szlabanu zaprogramowany na miejscu — bez
							wizyty w punkcie stacjonarnym w Rybnej. Dojazd na terenie Krakowa i okolic w ciągu{" "}
							{deliveryTimeHours} {deliveryTimeHours === 1 ? "godziny" : "godzin"} od zgłoszenia.
							Usługa kompleksowa: pilot + kodowanie + dojazd w cenie {REMOTE_CODING_PRICE} zł.
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
					<div className="rounded-lg bg-white p-6 shadow-sm">
						<div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
							Cena usługi
						</div>
						<div className="mb-1 text-2xl font-bold">{formatMoney(REMOTE_CODING_PRICE)}</div>
						<p className="text-sm text-gray-600">Pilot, kodowanie do odbiornika i dojazd w jednej cenie.</p>
					</div>
				</div>
			</section>

			<section className="mt-8 rounded-lg border border-gray-200 p-6 sm:p-8">
				<h2 className="mb-4 text-xl font-semibold sm:text-2xl">
					Jak przebiega kodowanie pilota z dojazdem?
				</h2>
				<p className="mb-3 text-sm leading-relaxed text-gray-700">
					Dzwonisz lub piszesz z zapytaniem i podajesz markę oraz model odbiornika bramy, szlabanu lub
					napędu garażowego — na tej podstawie dobieram pasujący pilot jeszcze przed przyjazdem.
					Umawiamy dogodny termin, a ja osobiście przyjeżdżam pod wskazany adres z gotowym pilotem i
					programuję go bezpośrednio do Twojego odbiornika. Sprawdzasz działanie na miejscu, zanim
					zapłacisz. Cały dojazd i kodowanie zajmuje zwykle do {deliveryTimeHours}{" "}
					{deliveryTimeHours === 1 ? "godziny" : "godzin"} od zgłoszenia.
				</p>
				<p className="mb-5 text-sm leading-relaxed text-gray-700">
					Obsługuję najpopularniejsze marki odbiorników i napędów, m.in. Hörmann, BFT, Beninca, Nice,
					Came i FAAC — jeśli nie masz pewności, czy dany pilot pasuje do Twojego odbiornika, wystarczy
					zadzwonić i podać model.
				</p>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div>
						<h3 className="mb-2 text-base font-semibold">Bramy wjazdowe i szlabany</h3>
						<p className="text-sm leading-relaxed text-gray-600">
							Kodowanie nowego pilota do bramy przesuwnej, skrzydłowej lub szlabanu — na miejscu,
							bez demontażu sterownika ani wizyty serwisanta w innym terminie.
						</p>
					</div>
					<div>
						<h3 className="mb-2 text-base font-semibold">Bramy garażowe</h3>
						<p className="text-sm leading-relaxed text-gray-600">
							Programuję również piloty do napędów garażowych. Jeśli potrzebujesz też{" "}
							<Link href="/uslugi/mobilne-dorabianie-kluczy" className="underline">
								dorobienia klucza z dojazdem
							</Link>
							, wykonuję to tym samym przyjazdem.
						</p>
					</div>
				</div>
			</section>

			<MobileServiceContactBar
				title="Zamów kodowanie pilota do bramy z dojazdem"
				phoneNumber={settings?.phone_number}
				whatsappUrl={settings?.whatsapp_url}
				messengerUrl={settings?.messenger_url}
			/>

			{products.length > 0 && (
				<section className="mt-8">
					<h2 className="mb-5 text-xl font-semibold sm:text-2xl">Piloty, które kodujemy z dojazdem</h2>
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

			<MobileServiceAreaGrid
				title="Obszar działania — kodowanie pilotów do bram w Krakowie i okolicy"
				description={
					menuItems.seo_text ||
					`Kodowanie pilotów do bram, szlabanów i garaży z dojazdem do klienta świadczymy na terenie Krakowa i okolicznych miejscowości. Nowy, zaprogramowany pilot dostarczamy i uruchamiamy na miejscu — bez konieczności przyjazdu do punktu w Rybnej.`
				}
				areas={areaCards}
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
