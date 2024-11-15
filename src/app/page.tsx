import { getFirstPageData } from "@/api/getFirstPageData";
import { FirstPageDataResponse } from "@/app/types";
import ArticleList from "@/components/articles/ArticleList";
import { CategoryListOnFirstPage } from "@/components/front/CategoryListOnFirstPage";
import { HeroItem } from "@/components/front/Hero";
import { JsonLd, ownerWebsiteJsonLd } from "@/components/seo/LdJson";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

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

export default async function Home() {
	const res = await getFirstPageData();

	const { categories, heros, articles }: FirstPageDataResponse = res;

	if (!categories || !heros) {
		return null;
	}

	return (
		<section className="mt-5">
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
