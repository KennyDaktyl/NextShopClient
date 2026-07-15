import { getFirstPageData } from "@/api/getFirstPageData";
import { getMenuItems } from "@/api/getMenuItems";
import { FirstPageDataResponse } from "@/app/types";
import ArticleList from "@/components/articles/ArticleList";
import { CategoryListOnFirstPage } from "@/components/front/CategoryListOnFirstPage";
import { HeroItem } from "@/components/front/Hero";
import { JsonLd, ownerWebsiteJsonLd } from "@/components/seo/LdJson";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { Banknote, CalendarCheck, Car, Phone, Smile, Wrench } from "lucide-react";
import CityDeliveryIllustration from "@/components/mobile-services/CityDeliveryIllustration";
import StampDesigner from "@/components/widgets/StampDesigner/StampDesigner";
import KeyPhotoInquiry from "@/components/widgets/KeyPhotoInquiry/KeyPhotoInquiry";

export const metadata: Metadata = {
	title: "Pieczątki i Dorabianie Kluczy – Profesjonalny Serwis w Rybnej",
	description:
		"Specjalizujemy się w pieczątkach firmowych i dorabianiu kluczy. Szybka realizacja, konkurencyjne ceny, klucze do skrzynek energetycznych. Sprawdź nas!",
	alternates: {
		canonical: process.env.NEXT_PUBLIC_BASE_URL,
	},
	openGraph: {
		title: "Pieczątki i Dorabianie Kluczy – Profesjonalny Serwis w Rybnej",
		description:
			"Specjalizujemy się w pieczątkach firmowych i dorabianiu kluczy. Szybka realizacja, konkurencyjne ceny, klucze do skrzynek energetycznych. Sprawdź nas!",
		url: process.env.NEXT_PUBLIC_BASE_URL,
		siteName: process.env.NEXT_PUBLIC_SITE_TITLE,
		images: [
			{
				url: "https://api.serwiswrybnej.pl/media/thumbnails/dorabianie-kluczy-samochodowych-i-mieszkaniowych-szybko-i-profesjonalnie_650x650.webp",
				width: 650,
				height: 650,
				alt: "Sklep z pieczątkiami - Profesjonalne Pieczątki Firmowe i Imienne na Zamówienie Online",
			},
		],
		locale: "pl_PL",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Pieczątki i Dorabianie Kluczy – Profesjonalny Serwis w Rybnej",
		description:
			"Specjalizujemy się w pieczątkach firmowych i dorabianiu kluczy. Szybka realizacja, konkurencyjne ceny, klucze do skrzynek energetycznych. Sprawdź nas!",
		images: [
			{
				url: "https://api.serwiswrybnej.pl/media/thumbnails/dorabianie-kluczy-samochodowych-i-mieszkaniowych-szybko-i-profesjonalnie_650x650.webp",
				width: 650,
				height: 650,
				alt: "Sklep z pieczątkiami - Profesjonalne Pieczątki Firmowe i Imienne na Zamówienie Online",
			},
		],
	},
};

const DEFAULT_DELIVERY_TIME_HOURS = 2;

export default async function Home() {
	const [res, keysMenu, stampsMenu] = await Promise.all([
		getFirstPageData(),
		getMenuItems({ categorySlug: "mobilne-dorabianie-kluczy" }),
		getMenuItems({ categorySlug: "mobilne-wyrob-pieczatek" }),
	]);

	const { categories, heros, articles }: FirstPageDataResponse = res;

	if (!categories || !heros) {
		return null;
	}

	const deliveryTimeHours = Math.max(
		keysMenu.mobile_service_settings?.delivery_time_hours ?? DEFAULT_DELIVERY_TIME_HOURS,
		stampsMenu.mobile_service_settings?.delivery_time_hours ?? DEFAULT_DELIVERY_TIME_HOURS,
	);

	return (
		<section className="mt-5">
			<section className="relative mb-10 overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-blue-950 p-6 text-white shadow-xl sm:p-10">
				<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
					<div>
						<span className="mb-4 inline-block animate-pulse rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wide shadow-lg shadow-blue-600/50">
							● Nowość
						</span>
						<h2 className="mb-3 text-2xl font-bold leading-tight sm:text-4xl">
							Usługi mobilne — dojeżdżamy do Ciebie
						</h2>
						<p className="mb-4 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
							Dorabianie kluczy i wyrób pieczątek bez wizyty w punkcie w Rybnej — dojeżdżamy do domu
							lub biura na terenie Krakowa i okolic w ciągu {deliveryTimeHours}{" "}
							{deliveryTimeHours === 1 ? "godziny" : "godzin"} od zgłoszenia.
						</p>
						<p className="mb-6 inline-block rounded-md bg-blue-600/20 px-4 py-2 text-sm font-bold text-blue-300 sm:text-base">
							🚗 Dojazd gratis* na terenie Krakowa i okolic
						</p>
						<div className="flex flex-wrap gap-3">
							<Link
								href="/uslugi/mobilne-dorabianie-kluczy"
								className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
							>
								Mobilne dorabianie kluczy
							</Link>
							<Link
								href="/uslugi/mobilne-wyrob-pieczatek"
								className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
							>
								Mobilne pieczątki
							</Link>
						</div>
						<p className="mt-3 text-xs text-gray-400">
							*Przy zamówieniu powyżej minimum logistycznego — szczegóły na stronie usługi.
						</p>
					</div>
					<div className="h-48 sm:h-64">
						<CityDeliveryIllustration />
					</div>
				</div>
			</section>

			<section className="mb-10 rounded-lg border border-gray-200 p-6 sm:p-8">
				<div className="mb-5 flex flex-wrap items-end justify-between gap-2">
					<div>
						<h2 className="mb-1 text-xl font-semibold sm:text-2xl">Zaprojektuj pieczątkę online</h2>
						<p className="text-sm text-gray-600">
							Zbuduj treść linia po linii i wyślij projekt do bezpłatnej wyceny.
						</p>
					</div>
					<Link
						href="/zaprojektuj-pieczatke"
						className="text-sm font-semibold text-blue-600 hover:underline"
					>
						Otwórz na pełnym ekranie →
					</Link>
				</div>
				<StampDesigner variant="embedded" />
			</section>

			<section className="mb-10 rounded-lg border border-gray-200 p-6 sm:p-8">
				<h2 className="mb-1 text-xl font-semibold sm:text-2xl">Sprawdź, czy dorobimy Twój klucz</h2>
				<p className="mb-5 text-sm text-gray-600">
					Wyślij zdjęcie klucza, a ocenimy czy go dorobimy — zanim przyjedziesz lub zamówisz
					dojazd.
				</p>
				<KeyPhotoInquiry />
			</section>

			<section className="mb-10 rounded-md bg-white py-8 text-gray-800">
				<div className="container mx-auto px-4">
					<h2 className="mb-2 text-2xl font-semibold">Jak to działa</h2>
					<p className="mb-8 text-sm text-gray-500">
						Usługa mobilna krok po kroku — od telefonu do pożegnania.
					</p>
					<div className="relative grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-y-0">
						<div
							className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gray-200 lg:block"
							aria-hidden="true"
						/>
						{[
							{ icon: Phone, label: "Dzwonisz do nas" },
							{ icon: CalendarCheck, label: "Umawiamy termin wizyty" },
							{ icon: Car, label: "Dojeżdżamy na miejsce" },
							{ icon: Wrench, label: "Wykonujemy usługę" },
							{ icon: Banknote, label: "Płatność na miejscu" },
							{ icon: Smile, label: "Dziękujemy, do zobaczenia!" },
						].map((step, index) => (
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

			{heros.map((hero, index) => (
				<div key={hero.id} className="mb-10 rounded-lg shadow-lg">
					<HeroItem heroData={hero} isFirst={index === 0} />
				</div>
			))}
			<div className="rounded-lg bg-gray-100 p-1 shadow-sm xl:p-8">
				<CategoryListOnFirstPage categories={categories} />
			</div>

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
			<section className="rounded-md bg-white py-8 text-gray-800">
				<div className="container mx-auto px-4">
					<h2 className="mb-4 text-2xl font-semibold">O nas</h2>
					<p className="mb-6">
						Witamy w Serwisie w Rybnej – lokalnym przedsiębiorstwie z wieloletnim doświadczeniem w
						naprawie telefonów komórkowych, dorabianiu kluczy oraz produkcji pieczątek. Nasza
						siedziba mieści się przy ul. Wspólnej 2 w Rybnej, a usługi świadczymy zarówno dla
						mieszkańców Rybnej, jak i okolicznych miejscowości, takich jak Krzeszowice, Alwernia,
						Liszki, Kryspinów czy Zabierzów.
					</p>
				</div>
			</section>

			<section className="rounded-md bg-gray-100 py-8 text-gray-800">
				<div className="container mx-auto px-4">
					<h2 className="mb-4 text-2xl font-semibold">Nasze usługi</h2>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						<div className="rounded-lg bg-white p-6 shadow-md">
							<h3 className="mb-2 text-xl font-semibold">Naprawa telefonów komórkowych</h3>
							<p>
								Oferujemy kompleksowe naprawy telefonów, w tym wymianę wyświetlaczy, naprawę złączy
								ładowania oraz wymianę baterii. Specjalizujemy się w serwisie urządzeń z systemem
								Android oraz iPhone.
							</p>
						</div>
						<div className="rounded-lg bg-white p-6 shadow-md">
							<h3 className="mb-2 text-xl font-semibold">Dorabianie kluczy</h3>
							<p>
								Świadczymy usługi dorabiania kluczy mieszkaniowych i samochodowych, w tym kopiowanie
								immobilizerów oraz wymianę obudów pilotów. Gwarantujemy precyzję i szybki czas
								realizacji.
							</p>
						</div>
						<div className="rounded-lg bg-white p-6 shadow-md">
							<h3 className="mb-2 text-xl font-semibold">Wyrób pieczątek</h3>
							<p>
								Produkujemy pieczątki firmowe, imienne oraz specjalistyczne, wykonane precyzyjnie
								metodą laserową. Oferujemy szybki czas realizacji oraz możliwość pełnej
								personalizacji.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="rounded-md bg-white py-8 text-gray-800">
				<div className="container mx-auto px-4">
					<h2 className="mb-4 text-2xl font-semibold">Kontakt</h2>
					<p className="mb-2">
						Zapraszamy do kontaktu pod numerem telefonu{" "}
						<a href="tel:+48506029980" className="text-blue-600">
							+48 506 029 980
						</a>{" "}
						lub osobiście w naszej siedzibie przy ul. Wspólnej 2, 32-061 Rybna.
					</p>
					<p>Godziny otwarcia: poniedziałek – piątek: 08:00 – 17:00.</p>
				</div>
			</section>

			<section className="mb-4 rounded-md bg-gray-100 py-8 text-gray-800">
				<div className="container mx-auto px-4">
					<h2 className="mb-4 text-2xl font-semibold">Obszar działania</h2>
					<p>
						Nasze usługi kierujemy do mieszkańców Rybnej oraz okolicznych miejscowości, takich jak
						Krzeszowice, Alwernia, Liszki, Czernichów, Kryspinów i Zabierzów. Dzięki współpracy z
						InPost, realizujemy również wysyłki na terenie całej Polski.
					</p>
				</div>
			</section>

			<JsonLd jsonLd={ownerWebsiteJsonLd()} />
		</section>
	);
}
