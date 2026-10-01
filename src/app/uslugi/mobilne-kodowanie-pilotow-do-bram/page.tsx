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
import Image from "next/image";
import { formatMoney, getProductImage, localityIn, stripHtmlTags } from "@/utils";
import { FAQPage, WithContext } from "schema-dts";

const CATEGORY_SLUG = "mobilne-kodowanie-pilotow-do-bram";
const DEFAULT_DELIVERY_TIME_HOURS = 2;
const REMOTE_CODING_PRICE = 199;

const FAQ_ITEMS: { question: string; answer: string }[] = [
	{
		question: "Ile kosztuje nowy pilot do bramy z dojazdem?",
		answer: `${REMOTE_CODING_PRICE} zł — w cenie jest nowy pilot, zaprogramowanie go do sterownika bramy i dojazd na terenie Krakowa i okolic. Płacisz po sprawdzeniu, że brama reaguje na pilota.`,
	},
	{
		question: "Skąd mam wiedzieć, jaki pilot pasuje do mojej bramy?",
		answer:
			"Wystarczy zdjęcie starego pilota albo naklejki na napędzie lub sterowniku (marka i model). Jeśli nie masz żadnego pilota, na miejscu sprawdzam typ sterownika i dobieram pasujący model.",
	},
	{
		question: "Zgubiłem jedynego pilota do bramy — czy da się dorobić nowego?",
		answer:
			"Tak. Nowy pilot programuje się bezpośrednio do odbiornika bramy, więc stary pilot nie jest potrzebny. Potrzebny jest tylko dostęp do sterownika (najczęściej w garażu lub przy słupku bramy).",
	},
	{
		question: "Czy zgubiony pilot nadal będzie otwierał bramę?",
		answer:
			"Dopóki jest zapisany w pamięci odbiornika — tak. Jeśli sterownik na to pozwala, czyszczę pamięć i programuję od nowa wszystkie piloty, które masz, dzięki czemu zgubiony przestaje działać.",
	},
	{
		question: "Czy pilot uniwersalny z marketu zadziała z moją bramą?",
		answer:
			"Tylko z częścią napędów. Wiele bram korzysta z kodu zmiennego (rolling code) lub konkretnej częstotliwości (433 MHz lub 868 MHz), z którymi tanie piloty kopiujące sobie nie radzą. Dlatego dobieram pilota do konkretnego sterownika.",
	},
	{
		question: "Gdzie dojeżdżasz?",
		answer:
			"Kraków i okolice — najczęściej domy jednorodzinne w gminach Zabierzów, Liszki, Czernichów, Krzeszowice, Alwernia, Wielka Wieś, Zielonki, Michałowice, Mogilany i Wieliczka.",
	},
];

const faqJsonLd: WithContext<FAQPage> = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: FAQ_ITEMS.map((item) => ({
		"@type": "Question",
		name: item.question,
		acceptedAnswer: { "@type": "Answer", text: item.answer },
	})),
};

export async function generateMetadata(): Promise<Metadata> {
	const category = await getCategoryMetaData({ currentCategorySlug: CATEGORY_SLUG });

	const title = category.meta_title || "Piloty do bram garażowych i wjazdowych – dojazd Kraków";
	const description =
		category.meta_description ||
		"Nowy pilot do bramy garażowej lub wjazdowej z dojazdem. Sprawdzam sterownik, dobieram pilota i programuję go na miejscu. Kraków i okolice.";

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
		phrase: `Pilot do bramy z dojazdem ${localityIn(locality)}`,
		href: `/uslugi/${CATEGORY_SLUG}-${locality.slug}`,
	}));

	return (
		<div className="mb-10 w-full">
			<section className="rounded-lg bg-gray-100 p-6 sm:p-10">
				<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
					<div>
						<h1 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl">
							{menuItems.h1_tag || "Piloty do bram garażowych i wjazdowych z dojazdem — Kraków i okolice"}
						</h1>
						<p className="mb-5 text-base leading-relaxed text-gray-700">
							Zgubiony, zepsuty albo potrzebujesz dodatkowego pilota do bramy? Przyjeżdżam pod Twój
							dom, sprawdzam typ sterownika, dobieram nowego pilota i programuję go na miejscu — bez
							szukania serwisu napędów i bez wizyty w punkcie w Rybnej. Dojazd na terenie Krakowa i
							okolic w ciągu {deliveryTimeHours} {deliveryTimeHours === 1 ? "godziny" : "godzin"} od
							zgłoszenia. Usługa kompleksowa: pilot + programowanie + dojazd w cenie{" "}
							{REMOTE_CODING_PRICE} zł.
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
					Dorobienie pilota do bramy z dojazdem — jak to wygląda?
				</h2>
				<ol className="mb-5 list-inside list-decimal space-y-2 text-sm leading-relaxed text-gray-700">
					<li>
						<strong>Zgłoszenie</strong> — dzwonisz lub piszesz na WhatsApp. Jeśli możesz, wyślij
						zdjęcie starego pilota albo naklejki na napędzie bramy.
					</li>
					<li>
						<strong>Dojazd</strong> — umawiamy termin i przyjeżdżam pod wskazany adres, zwykle w ciągu{" "}
						{deliveryTimeHours} {deliveryTimeHours === 1 ? "godziny" : "godzin"} od zgłoszenia.
					</li>
					<li>
						<strong>Sprawdzenie sterownika</strong> — na miejscu sprawdzam typ odbiornika, częstotliwość
						(433 MHz lub 868 MHz) i rodzaj kodu, a potem dobieram pasującego pilota.
					</li>
					<li>
						<strong>Programowanie na miejscu</strong> — programuję nowego pilota do Twojej bramy,
						sprawdzasz działanie i dopiero wtedy płacisz.
					</li>
				</ol>
				<p className="text-sm leading-relaxed text-gray-700">
					Obsługuję najpopularniejsze napędy bram: Hörmann, Nice, Came, FAAC, BFT, Beninca i Somfy. Nie
					wiesz, jaki masz napęd? Zadzwoń — ustalimy to razem albo sprawdzę to po przyjeździe.
				</p>
			</section>

			<section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
				<div className="rounded-lg border border-gray-200 p-6">
					<h2 className="mb-2 text-lg font-semibold sm:text-xl">Pilot do bramy garażowej</h2>
					<p className="text-sm leading-relaxed text-gray-600">
						Programuję piloty do napędów bram garażowych segmentowych i uchylnych — w garażach
						wolnostojących i w bryle domu. Dodatkowy pilot dla domownika, następca zepsutego albo
						zgubionego — dobieram model zgodny z Twoim napędem i koduję go na miejscu.
					</p>
				</div>
				<div className="rounded-lg border border-gray-200 p-6">
					<h2 className="mb-2 text-lg font-semibold sm:text-xl">
						Pilot do bramy wjazdowej i szlabanu
					</h2>
					<p className="text-sm leading-relaxed text-gray-600">
						Nowy pilot do bramy wjazdowej przesuwnej lub skrzydłowej oraz do szlabanu na osiedlu czy
						parkingu firmowym. Programuję go bezpośrednio do sterownika, bez demontażu i bez
						umawiania serwisanta napędów. Jeśli potrzebujesz też{" "}
						<Link href="/uslugi/mobilne-dorabianie-kluczy" className="underline">
							dorobienia kluczy z dojazdem
						</Link>
						, zrobię to podczas tej samej wizyty.
					</p>
				</div>
			</section>

			<section className="mt-8 rounded-lg bg-gray-100 p-6 sm:p-8">
				<h2 className="mb-3 text-xl font-semibold sm:text-2xl">Zgubiony pilot do bramy — co zrobić?</h2>
				<p className="text-sm leading-relaxed text-gray-700">
					Zgubiony pilot nadal jest zapisany w pamięci odbiornika, więc teoretycznie ktoś, kto go
					znajdzie, może otworzyć bramę. Przy wizycie programuję nowego pilota, a jeśli sterownik na
					to pozwala, czyszczę jego pamięć i koduję od nowa wszystkie piloty, które zostały w domu.
					Dzięki temu zgubiony pilot przestaje działać. Stary pilot nie jest potrzebny — nowy
					programuję bezpośrednio do sterownika bramy.
				</p>
			</section>

			<MobileServiceContactBar
				title="Zamów nowego pilota do bramy z dojazdem"
				phoneNumber={settings?.phone_number}
				whatsappUrl={settings?.whatsapp_url}
				messengerUrl={settings?.messenger_url}
			/>

			{products.length > 0 && (
				<section className="mt-8">
					<h2 className="mb-5 text-xl font-semibold sm:text-2xl">
						Piloty do bram, które programuję z dojazdem
					</h2>
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{products.map((product) => {
							const productImage = getProductImage(product, 350, 350);
							return (
								<Link
									key={product.id}
									href={product.full_path}
									className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm transition hover:border-gray-300 hover:shadow-md"
								>
									<div className="flex h-48 items-center justify-center bg-gray-50 p-4">
										<Image
											src={productImage.url}
											alt={productImage.alt}
											title={productImage.title}
											width={productImage.width}
											height={productImage.height}
											className="h-full w-auto object-contain transition group-hover:scale-105"
										/>
									</div>
									<div className="flex flex-1 flex-col p-5">
										<h3 className="mb-2 text-base font-semibold">{product.name}</h3>
										<p className="mb-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
											{stripHtmlTags(product.description)}
										</p>
										<div className="mt-auto text-sm font-bold">od {formatMoney(product.current_price)}</div>
									</div>
								</Link>
							);
						})}
					</div>
				</section>
			)}

			<MobileServiceAreaGrid
				title="Piloty do bram z dojazdem — Kraków i okolice"
				description={
					menuItems.seo_text ||
					`Nowe piloty do bram garażowych i wjazdowych programuję z dojazdem na terenie Krakowa i okolicznych gmin. Wybierz swoją miejscowość, żeby sprawdzić szczegóły.`
				}
				areas={areaCards}
			/>

			<section className="mt-8">
				<h2 className="mb-4 text-xl font-semibold sm:text-2xl">
					Najczęstsze pytania o piloty do bram
				</h2>
				<div className="space-y-4">
					{FAQ_ITEMS.map((item) => (
						<div key={item.question} className="rounded-lg border border-gray-200 p-5">
							<h3 className="mb-2 text-base font-semibold">{item.question}</h3>
							<p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
						</div>
					))}
				</div>
			</section>

			<MobileServiceCrossLink href="/uslugi/mobilne-dorabianie-kluczy" label="Dorabianie kluczy z dojazdem" />

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
			<JsonLd jsonLd={faqJsonLd} />
		</div>
	);
}
