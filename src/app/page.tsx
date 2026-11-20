import { getFirstPageData } from "@/api/getFirstPageData";
import { getMenuItems } from "@/api/getMenuItems";
import { getServiceLocalities } from "@/api/getServiceLocalities";
import { FirstPageDataResponse, MenuItem, ServiceLocality } from "@/app/types";
import ArticleList from "@/components/articles/ArticleList";
import { CategoryListOnFirstPage } from "@/components/front/CategoryListOnFirstPage";
import { HeroItem } from "@/components/front/Hero";
import { JsonLd, ownerWebsiteJsonLd } from "@/components/seo/LdJson";
import {
	Faq,
	FAQ_APPOINTMENT,
	FAQ_CAR_KEY,
	FAQ_CAR_KEY_NO_ORIGINAL,
	FAQ_FLAT_KEY,
	FAQ_LOCKED_KEYS,
	FAQ_VAG,
	faqTravel,
} from "@/components/seo/Faq";
import { AREA_GROUPS } from "@/components/seo/serviceArea";
import {
	BATTERY_REPLACEMENT_FROM,
	CAR_KEY_PRICE,
	FLAT_KEY_PRICE,
	HOUSING_REPLACEMENT_FROM,
	OBD_PROGRAMMING_PRICE,
	REMOTE_CODING_PRICE,
} from "@/components/mobile-services/prices";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { Banknote, CalendarCheck, Car, Phone, Smile, Wrench } from "lucide-react";
import CityDeliveryIllustration from "@/components/mobile-services/CityDeliveryIllustration";
import KeyPhotoInquiry from "@/components/widgets/KeyPhotoInquiry/KeyPhotoInquiry";

const TITLE = "Klucze samochodowe i immobilizery z dojazdem – Kraków";
const DESCRIPTION =
	"Dorabianie i programowanie kluczy samochodowych, immobilizerów i pilotów z dojazdem. Awaryjne otwieranie aut, VAG także po 2016. Kraków i okolice.";
const OG_IMAGE = {
	url: "https://api.serwiswrybnej.pl/media/thumbnails/dorabianie-kluczy-samochodowych-i-mieszkaniowych-szybko-i-profesjonalnie_650x650.webp",
	width: 650,
	height: 650,
	alt: "Klucze samochodowe i piloty – dorabianie i programowanie immobilizerów z dojazdem, Kraków",
};

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	alternates: {
		canonical: process.env.NEXT_PUBLIC_BASE_URL,
	},
	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		url: process.env.NEXT_PUBLIC_BASE_URL,
		siteName: process.env.NEXT_PUBLIC_SITE_TITLE,
		images: [OG_IMAGE],
		locale: "pl_PL",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: TITLE,
		description: DESCRIPTION,
		images: [OG_IMAGE],
	},
};

const PHONE_HREF = "tel:+48506029980";
const CAR_KEYS = "/uslugi/klucze-samochodowe";
const EMERGENCY = `${CAR_KEYS}/awaryjne-otwieranie-samochodow`;
const BRANDS_CATEGORY_SLUG = "programowanie-kluczy-samochodowych";
const VAG_SLUGS = ["audi", "volkswagen", "seat", "skoda"];
const STAMPS_LINK = "/produkty/pieczatki";

const CAR_KEY_TILES: { title: string; text: string; price: string; href: string; isNew?: boolean }[] = [
	{
		title: "Programowanie kluczy i pilotów",
		text: "Nowy klucz lub pilot programowany do auta przez złącze OBD — także gdy nie masz żadnego działającego klucza.",
		price: `od ${OBD_PROGRAMMING_PRICE} zł + koszt pilota`,
		href: `${CAR_KEYS}/programowanie-kluczy-samochodowych`,
	},
	{
		title: "Klucz z grotem + immobilizer",
		text: "Zapasowy kluczyk: docinam grot i kopiuję immobilizer z Twojego działającego klucza.",
		price: `${CAR_KEY_PRICE} zł`,
		href: `${CAR_KEYS}/kopiowanie-immobilizerow`,
	},
	{
		title: "Klucz bez oryginału / zgubiony kluczyk",
		text: "Dekoderem Lishi odczytuję zamek, docinam grot i programuję immobilizer na miejscu.",
		price: "wycena telefoniczna po marce, modelu i roczniku",
		href: "/blog/zgubiony-kluczyk-do-auta-dorobienie-klucza-bez-oryginalu-z-dojazdem-id-10",
	},
	{
		title: "Awaryjne otwieranie samochodów",
		text: "Zatrzaśnięte kluczyki? Otwieram auto bez uszkodzeń, bez wybijania szyby i wiercenia.",
		price: "wycena telefoniczna",
		href: EMERGENCY,
		isNew: true,
	},
	{
		title: "Wymiana obudowy pilota",
		text: "Pęknięta obudowa lub wytarte przyciski, a elektronika działa — nowa obudowa bez programowania.",
		price: `od ${HOUSING_REPLACEMENT_FROM} zł`,
		href: `${CAR_KEYS}/wymiana-obudowy`,
	},
	{
		title: "Wymiana baterii w pilocie",
		text: "Spada zasięg pilota? Zaczynam od baterii, zanim zaproponuję nowy klucz.",
		price: `od ${BATTERY_REPLACEMENT_FROM} zł`,
		href: `${CAR_KEYS}/wymiana-baterii-w-pilotach-samochodowych`,
	},
];

const OTHER_SERVICES = [
	{
		title: "Piloty do bram z dojazdem",
		text: "Nowy pilot, zaprogramowany do odbiornika bramy, z dojazdem w jednej cenie.",
		price: `${REMOTE_CODING_PRICE} zł`,
		href: "/uslugi/mobilne-kodowanie-pilotow-do-bram",
	},
	{
		title: "Naprawy telefonów (serwis GSM)",
		text: "Wymiana wyświetlaczy, baterii i złączy ładowania w telefonach.",
		price: "wycena telefoniczna",
		href: "/uslugi/naprawy-telefonow",
	},
	{
		title: "Klucze mieszkaniowe",
		text: "Klucze do drzwi, piwnic i skrzynek pocztowych — także z dojazdem.",
		price: `od ${FLAT_KEY_PRICE} zł`,
		href: "/uslugi/dorabianie-kluczy-mieszkaniowych",
	},
];

const STEPS = [
	{ icon: Phone, label: "Dzwonisz do mnie" },
	{ icon: CalendarCheck, label: "Umawiamy termin wizyty (nie mam stałych godzin otwarcia)" },
	{ icon: Car, label: "Dojeżdżam na miejsce" },
	{ icon: Wrench, label: "Wykonuję usługę" },
	{ icon: Banknote, label: "Płatność na miejscu" },
	{ icon: Smile, label: "Dziękuję, do zobaczenia!" },
];

/** „Programowanie Kluczy i Pilotów Samochodowych Opel” → „Opel”. */
const brandName = (item: MenuItem): string =>
	item.name.replace(/^Programowanie (Kluczy i Pilotów Samochodowych|Pilota|Pilotów) /i, "");

const normalize = (text: string) => text.toLocaleLowerCase("pl-PL").trim();

const PlaceList = ({
	places,
	localities,
}: {
	places: readonly string[];
	localities: readonly ServiceLocality[];
}) => {
	const slugByName = new Map(localities.map((locality) => [normalize(locality.name), locality.slug]));
	return (
		<p className="text-sm leading-relaxed text-gray-700">
			{places.map((place, index) => {
				const slug = slugByName.get(normalize(place));
				return (
					<span key={place}>
						{slug ? (
							<Link href={`/uslugi/mobilne-dorabianie-kluczy-${slug}`} className="underline">
								{place}
							</Link>
						) : (
							place
						)}
						{index < places.length - 1 ? ", " : "."}
					</span>
				);
			})}
		</p>
	);
};

export default async function Home() {
	const [res, brandsMenu, localities] = await Promise.all([
		getFirstPageData(),
		getMenuItems({ categorySlug: BRANDS_CATEGORY_SLUG }),
		getServiceLocalities(),
	]);

	const { categories, heros, articles }: FirstPageDataResponse = res;

	if (!categories || !heros) {
		return null;
	}

	const isStampsHero = (link: string | null) => Boolean(link && link.includes(STAMPS_LINK));
	const stampHeros = heros.filter((hero) => isStampsHero(hero.link));
	const otherHeros = heros.filter((hero) => !isStampsHero(hero.link));
	const brands = brandsMenu?.items ?? [];

	return (
		<section className="mt-5">
			{/* 1. Hero */}
			<section className="relative mb-10 overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-blue-950 p-6 text-white shadow-xl sm:p-10">
				<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
					<div>
						<Link
							href={EMERGENCY}
							className="mb-4 inline-block rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wide shadow-lg shadow-blue-600/50"
						>
							● Nowość: awaryjne otwieranie aut
						</Link>
						<h1 className="mb-3 text-2xl font-bold leading-tight sm:text-4xl">
							Klucze samochodowe, programowanie immobilizerów i pilotów z dojazdem — Kraków i okolice
						</h1>
						{/* Na telefonie przycisk „Zadzwoń” zaraz pod H1 – widoczny bez przewijania. */}
						<a
							href={PHONE_HREF}
							className="mb-4 inline-block rounded-md bg-green-500 px-6 py-3 text-base font-bold text-white shadow-lg transition hover:bg-green-600 lg:hidden"
						>
							Zadzwoń: 506 029 980
						</a>
						<p className="mb-6 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
							Dorabiam klucze samochodowe, koduję immobilizery i programuję piloty na miejscu: pod
							domem, pracą albo na parkingu. Także awaryjne otwieranie samochodu i klucz bez
							oryginału. Audi, Volkswagen, Seat i Skoda również z roczników po 2016. Płacisz po
							sprawdzeniu, że klucz działa.
						</p>
						<div className="flex flex-wrap gap-3">
							<a
								href={PHONE_HREF}
								className="hidden rounded-md bg-green-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-green-600 lg:inline-block"
							>
								Zadzwoń: 506 029 980
							</a>
							<Link
								href={CAR_KEYS}
								className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
							>
								Klucze samochodowe
							</Link>
							<Link
								href={EMERGENCY}
								className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
							>
								Awaryjne otwieranie auta
							</Link>
							<Link
								href="/uslugi/mobilne-dorabianie-kluczy"
								className="rounded-md bg-gray-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
							>
								Dorabianie kluczy z dojazdem
							</Link>
						</div>
					</div>
					<div className="hidden h-64 lg:block">
						<CityDeliveryIllustration />
					</div>
				</div>
			</section>

			{/* 2. Klucze i piloty samochodowe */}
			<section className="mb-10">
				<h2 className="mb-5 text-2xl font-semibold">Klucze i piloty samochodowe</h2>
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{CAR_KEY_TILES.map((tile) => (
						<Link
							key={tile.href}
							href={tile.href}
							className="relative rounded-lg border border-gray-200 p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
						>
							{tile.isNew && (
								<span className="absolute right-3 top-3 rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold uppercase text-white">
									Nowość
								</span>
							)}
							<h3 className="mb-2 pr-16 text-base font-semibold">{tile.title}</h3>
							<p className="mb-3 text-sm leading-relaxed text-gray-600">{tile.text}</p>
							<div className="text-sm font-bold">{tile.price}</div>
						</Link>
					))}
				</div>
			</section>

			{/* 3. Obsługiwane marki */}
			{brands.length > 0 && (
				<section className="mb-10 rounded-lg bg-gray-100 p-6 sm:p-8">
					<h2 className="mb-2 text-2xl font-semibold">Obsługiwane marki</h2>
					<p className="mb-4 text-sm text-gray-600">
						Programuję klucze i piloty do aut tych marek. Możliwość wykonania potwierdzam przez
						telefon po modelu i roczniku.
					</p>
					<ul className="flex flex-wrap gap-2">
						{brands.map((item) => {
							const isVag = VAG_SLUGS.some((slug) => item.slug.endsWith(`-${slug}`));
							return (
								<li key={item.slug}>
									<Link
										href={item.full_path}
										className="inline-block rounded-md bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm transition hover:bg-gray-50"
									>
										{brandName(item)}
										{isVag && <span className="ml-1 text-xs text-blue-600">(VAG, także po 2016)</span>}
									</Link>
								</li>
							);
						})}
					</ul>
				</section>
			)}

			{/* 4. Jak to działa */}
			<section className="mb-10 rounded-md bg-white py-8 text-gray-800">
				<div className="container mx-auto px-4">
					<h2 className="mb-2 text-2xl font-semibold">Jak to działa</h2>
					<p className="mb-8 text-sm text-gray-500">
						Usługa z dojazdem krok po kroku — od telefonu do pożegnania.
					</p>
					<div className="relative grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-y-0">
						<div
							className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gray-200 lg:block"
							aria-hidden="true"
						/>
						{STEPS.map((step, index) => (
							<div key={step.label} className="relative flex flex-col items-center text-center">
								<div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-blue-600 shadow-md">
									<step.icon className="h-7 w-7 text-white" aria-hidden="true" />
								</div>
								<div className="mb-1 text-xs font-bold uppercase tracking-wide text-blue-600">
									Krok {index + 1}
								</div>
								<p className="px-1 text-sm font-medium leading-snug">{step.label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 5. Sprawdź, czy dorobimy Twój klucz */}
			<section className="mb-10 rounded-lg border border-gray-200 p-6 sm:p-8">
				<h2 className="mb-1 text-xl font-semibold sm:text-2xl">Sprawdź, czy dorobimy Twój klucz</h2>
				<p className="mb-5 text-sm text-gray-600">
					Wyślij zdjęcie klucza — także samochodowego (sfotografuj grot i główkę kluczyka) — a ocenię,
					czy go dorobię, zanim przyjedziesz lub zamówisz dojazd.
				</p>
				<KeyPhotoInquiry />
			</section>

			{/* 6. Pozostałe usługi */}
			<section className="mb-10">
				<h2 className="mb-5 text-2xl font-semibold">Pozostałe usługi</h2>
				<div className="grid grid-cols-1 gap-5 md:grid-cols-3">
					{OTHER_SERVICES.map((tile) => (
						<Link
							key={tile.href}
							href={tile.href}
							className="rounded-lg border border-gray-200 p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
						>
							<h3 className="mb-2 text-base font-semibold">{tile.title}</h3>
							<p className="mb-3 text-sm leading-relaxed text-gray-600">{tile.text}</p>
							<div className="text-sm font-bold">{tile.price}</div>
						</Link>
					))}
				</div>
			</section>

			{otherHeros.map((hero, index) => (
				<div key={hero.id} className="mb-10 rounded-lg shadow-lg">
					<HeroItem heroData={hero} isFirst={index === 0} />
				</div>
			))}

			{/* 7. Kategorie promowane (kolejność z pola order w bazie) */}
			<div className="rounded-lg bg-gray-100 p-1 shadow-sm xl:p-8">
				<CategoryListOnFirstPage categories={categories} />
			</div>

			{/* 8. Blog */}
			<div className="rounded-lg bg-gray-100 p-1 shadow-sm xl:p-8">
				<Link role="link" href="/blog">
					<p className="mb-6 w-full border-b-2 border-gray-300 pb-2 text-2xl font-bold">
						Najnowsze artykuły blogowe
					</p>
				</Link>
				<ArticleList articles={articles} />
				<div className="mt-5 flex justify-center">
					<Link role="link" href="/blog">
						<Button variant="default" className="rounded-md px-4 py-2 text-white">
							Zobacz wszystkie artykuły
						</Button>
					</Link>
				</div>
			</div>

			{/* 9. Obszar działania */}
			<section className="mb-4 mt-10 rounded-md bg-gray-100 px-4 py-8 text-gray-800">
				<h2 className="mb-4 text-2xl font-semibold">Obszar działania: Kraków i okolice</h2>
				<p className="mb-5">
					Dojeżdżam do klienta na terenie całego Krakowa i okolicznych gmin, a także w okolicach
					Rybnej, gdzie mam punkt.
				</p>
				<div className="grid grid-cols-1 gap-5 md:grid-cols-3">
					{AREA_GROUPS.map((group) => (
						<div key={group.label}>
							<h3 className="mb-2 text-base font-semibold">{group.label}:</h3>
							<PlaceList places={group.places} localities={localities} />
						</div>
					))}
				</div>
			</section>

			{/* 10. Najczęstsze pytania */}
			<Faq
				html
				items={[
					FAQ_CAR_KEY,
					FAQ_CAR_KEY_NO_ORIGINAL,
					FAQ_VAG,
					FAQ_LOCKED_KEYS,
					faqTravel(localities),
					FAQ_APPOINTMENT,
					FAQ_FLAT_KEY,
				]}
			/>

			{/* 11. Pieczątki – na samym dole */}
			<section className="mt-10 rounded-lg border border-gray-200 p-6 sm:p-8">
				<h2 className="mb-2 text-xl font-semibold sm:text-2xl">
					Pieczątki firmowe i imienne – zamów online
				</h2>
				<p className="mb-4 text-sm text-gray-600">
					Pieczątki firmowe, imienne i datowniki z wysyłką lub dojazdem. Projekt przygotujesz sam w
					kreatorze online.
				</p>
				<div className="flex flex-wrap gap-3">
					<Link
						href={STAMPS_LINK}
						className="rounded-md bg-gray-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-900"
					>
						Pieczątki w sklepie
					</Link>
					<Link
						href="/zaprojektuj-pieczatke"
						className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-gray-400"
					>
						Zaprojektuj pieczątkę online
					</Link>
				</div>
			</section>
			{stampHeros.map((hero) => (
				<div key={hero.id} className="mt-5 rounded-lg shadow-lg">
					<HeroItem heroData={hero} isFirst={false} />
				</div>
			))}

			{/* 12. O nas i kontakt */}
			<section className="mt-10 rounded-md bg-white py-8 text-gray-800">
				<div className="container mx-auto px-4">
					<h2 className="mb-4 text-2xl font-semibold">O nas</h2>
					<p className="mb-4">
						Serwis w Rybnej to lokalna firma z wieloletnim doświadczeniem. Dziś zajmuję się przede
						wszystkim kluczami samochodowymi: dorabiam klucze z immobilizerem, programuję piloty i
						immobilizery, a także awaryjnie otwieram samochody — z dojazdem do klienta w Krakowie i
						okolicach. Koduję też piloty do bram, naprawiam telefony, dorabiam klucze mieszkaniowe,
						a w sklepie internetowym można zamówić pieczątki firmowe i imienne.
					</p>
				</div>
			</section>

			<section className="rounded-md bg-gray-100 py-8 text-gray-800">
				<div className="container mx-auto px-4">
					<h2 className="mb-4 text-2xl font-semibold">Kontakt</h2>
					<p className="mb-2">
						Zadzwoń:{" "}
						<a href={PHONE_HREF} className="text-blue-600">
							+48 506 029 980
						</a>
						. Punkt: ul. Wspólna 2, 32-061 Rybna.
					</p>
					<p>Proszę o umówienie wizyty, ponieważ wykonuję zlecenia z dojazdem do klienta.</p>
				</div>
			</section>

			<JsonLd jsonLd={ownerWebsiteJsonLd(localities)} />
		</section>
	);
}
